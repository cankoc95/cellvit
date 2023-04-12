#!/usr/bin/env python3

from __future__ import print_function, division
import os
import random
import torch
import timm
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from torch import nn
from torch.optim import Adam, AdamW
from datasets import Dataset
from torchvision import transforms, utils
from torch.utils.data import DataLoader
import torch.optim as optim
from sklearn.metrics import f1_score
from torch.optim import lr_scheduler
from transformers import get_linear_schedule_with_warmup
from tqdm import tqdm
import time
import copy
import cv2
import wandb
import uuid
import tempfile
from datetime import datetime, date

from maxvit_dataset import MaxVitDataset

# Ignore warnings
import warnings
warnings.filterwarnings("ignore")


os.environ['WANDB_API_KEY']='808606b1ec54e09c37c9c19ea6bb8d5b8a679987'
CELL_PAINTING_DIR = '/home/ubuntu/src'
MODEL_OUTPUT_DIR = '/dev/shm'
CACHE_DIR = CELL_PAINTING_DIR + "/cache"
BROAD_DIR = CELL_PAINTING_DIR + '/data/cpg0019-moshkov-deepprofiler/broad'

class_labels_to_int = {
    'AKT1_E17K': 0,
    'AKT1_WT': 1,
    'BRAF_V600E': 2,
    'BRAF_WT': 3,
    'CDC42_Q61L': 4,
    'CDC42_T17N': 5,
    'CDC42_WT': 6,
    'EMPTY': 7,
    'KRAS_G12V': 8,
    'KRAS_WT': 9,
    'RAF1_L613V': 10,
    'RAF1_WT': 11,
    'RHOA_Q63L': 12,
    'RHOA_WT': 13
}


class CFG:
  data_dir = CACHE_DIR
  debug = False
  n_gpu = 1
  # device = "cpu" # ['cpu', 'mps']
  img_size = 224
  ### total # of classes in this dataset
  num_classes = len(class_labels_to_int)
  ### model
  model_name = 'maxvit_large_tf_224'
  model_checkpoint = '/dev/shm/2023-04-10/maxvit_large_tf_224/checkpoint-best/MaxVitModel_ep0.6746083788706739.pth'
  # optimizer_checkpoint = CELL_PAINTING_DIR + '/optimizer.pt'
  pretrained=True
  batch_size = 16
  num_epochs = 30
  num_workers = 20

  ### set only one to True
  save_best_loss = False
  save_best_accuracy = True

  optimizer = 'adamw' # ["rmsprop", "adam"]
  learning_rate = 5e-5
  adam_epsilon = 1e-6
  weight_decay = 1e-6 # for adamw
  l2_penalty = 0.01 # for RMSprop
  rms_momentum = 0 # for RMSprop

  ### learning rate scheduler (LRS)
  scheduler = 'ReduceLROnPlateau' # []

  # scheduler = 'CosineAnnealingLR'
  plateau_factor = 0.5
  plateau_patience = 3
  cosine_T_max = 4
  cosine_eta_min = 1e-8
  verbose = True

  ### train and validation DataLoaders
  shuffle = True
  random_seed = 42

  output_dir = MODEL_OUTPUT_DIR + '/' + str(date.today())
  checkpoint_last = output_dir + '/' + model_name + '/checkpoint-last'
  checkpoint_best = output_dir + '/' + model_name + '/checkpoint-best'


class WandBLogger(object):
    def __init__(self, variant, project, prefix=''):
      """
      Args:
        variant: dictionary of hyperparameters
        project: name of project
      """
      log_dir = tempfile.mkdtemp()
      if prefix != '':
          project = '{}--{}'.format(prefix, project)

      wandb.init(
          config=variant,
          project=project,
          dir=log_dir,
          id=uuid.uuid4().hex,
      )

    def log(self, *args, **kwargs):
      wandb.log(*args, **kwargs)


class MaxVitClassifier(nn.Module):
    def __init__(self, cfg, checkpoint=None):
        super().__init__()
        self.model_name = cfg.model_name
        self.model = timm.create_model(cfg.model_name, 
                                       pretrained=cfg.pretrained, 
                                       num_classes=cfg.num_classes)

    def forward(self, x):
        x = self.model(x)
        return x
    
    def freeze(self):
        # To freeze the residual layers
        for param in self.model.parameters():
            param.requires_grad = False

        for param in self.model.head.parameters():
            param.requires_grad = True
    
    def unfreeze(self):
        # Unfreeze all layers
        for param in self.model.parameters():
            param.requires_grad = True


def set_seed(cfg):
    random.seed(cfg.random_seed)
    np.random.seed(cfg.random_seed)
    torch.manual_seed(cfg.random_seed)
    if cfg.n_gpu > 0:
        torch.cuda.manual_seed_all(cfg.random_seed)

# def f1_score(y_pred, y_true):
#     epsilon = 1e-7  # to avoid division by zero
#     y_pred = torch.round(y_pred)  # round predicted probabilities to binary labels
#     tp = torch.sum(y_true * y_pred, dim=0)
#     fp = torch.sum((1 - y_true) * y_pred, dim=0)
#     fn = torch.sum(y_true * (1 - y_pred), dim=0)
#     precision = tp / (tp + fp + epsilon)
#     recall = tp / (tp + fn + epsilon)
#     f1 = 2 * precision * recall / (precision + recall + epsilon)
#     return torch.mean(f1)

def train_model(cfg, model, dataloaders, criterion, optimizer):
    since = time.time()

    val_acc_history = []

    best_model_wts = copy.deepcopy(model.state_dict())
    best_acc = 0.0

    last_checkpoint_path = CFG.checkpoint_last
    last_scheduler_path = os.path.join(last_checkpoint_path, 'scheduler.pt')
    last_optimizer_path = os.path.join(last_checkpoint_path, 'optimizer.pt')
    best_checkpoint_path = CFG.checkpoint_best
    best_scheduler_path = os.path.join(best_checkpoint_path, 'scheduler.pt')
    best_optimizer_path = os.path.join(best_checkpoint_path, 'optimizer.pt')

    for epoch in range(cfg.num_epochs):
        print('Epoch {}/{}'.format(epoch, cfg.num_epochs - 1))
        print('-' * 10)

        wblogdict = {}

        # Each epoch has a training and validation phase
        for phase in ['train', 'dev']:
            if phase == 'train':
                model.train()  # Set model to training mode
            else:
                model.eval()   # Set model to evaluate mode

            running_loss = 0.0
            running_corrects = 0
            y_true, y_pred = [], []

            # Iterate over data.
            for inputs, labels in tqdm(dataloaders[phase]):
                inputs = inputs.to(device)
                labels = labels.to(device)

                # zero the parameter gradients
                optimizer.zero_grad()

                # forward
                # track history if only in train
                with torch.set_grad_enabled(phase == 'train'):
                    # Get model outputs and calculate loss
                    outputs = model(inputs)
                    loss = criterion(outputs, labels)

                    _, preds = torch.max(outputs, 1)

                    # backward + optimize only if in training phase
                    if phase == 'train':
                        loss.backward()
                        optimizer.step()

                    if phase == 'dev':
                        y_true += labels.tolist()
                        y_pred += preds.tolist()            

                # statistics
                running_loss += loss.item() * inputs.size(0)
                running_corrects += torch.sum(preds == labels.data)

            epoch_loss = running_loss / len(dataloaders[phase].dataset)
            epoch_acc = running_corrects.double() / len(dataloaders[phase].dataset)
            epoch_f1 = f1_score(y_true, y_pred, average='weighted')

            wblogdict[f'{phase}/loss'] = np.round(epoch_loss, 4)
            wblogdict[f'{phase}/acc'] = np.round(epoch_acc.cpu(), 4)

            if phase == 'train':
                wblogdict['train/learning_rate'] = CFG.learning_rate
                print('{} Loss: {:.4f} Acc: {:.4f}'.format(phase, epoch_loss, epoch_acc))

            if phase == 'dev':
                wblogdict[f'{phase}/f1'] = np.round(epoch_f1, 4)
                print('{} Loss: {:.4f} Acc: {:.4f} F1 Score {:.4f}'.format(phase, epoch_loss, epoch_acc, epoch_f1))

            if not os.path.exists(last_checkpoint_path):
                os.makedirs(last_checkpoint_path)
            
            # torch.save(model.state_dict(), last_checkpoint_path + f"/MaxVitModel_ep{epoch_acc}.pth")
            # torch.save(optimizer.state_dict(), last_optimizer_path)

            # deep copy the model
            if phase == 'dev' and epoch_acc > best_acc:
                best_acc = epoch_acc
                best_model_wts = copy.deepcopy(model.state_dict())
            
                if not os.path.exists(best_checkpoint_path):
                    os.makedirs(best_checkpoint_path)

                torch.save(model.state_dict(), best_checkpoint_path + f"/MaxVitModel_ep{best_acc}.pth")
                torch.save(optimizer.state_dict(), best_optimizer_path)
  
            if phase == 'dev':
                val_acc_history.append(epoch_acc)
                # scheduler.step(epoch_loss)

        wblogger.log(wblogdict)
        print()

    time_elapsed = time.time() - since
    print('Training complete in {:.0f}m {:.0f}s'.format(time_elapsed // 60, time_elapsed % 60))
    print('Best val Acc: {:4f}'.format(best_acc))

    # load best model weights
    model.load_state_dict(best_model_wts)
    return model, val_acc_history



if __name__ == "__main__":
    wblogger = WandBLogger(
        variant={
        'initial_learning_rate': CFG.learning_rate,
        'adam_epsilon': CFG.adam_epsilon,
        'num_epochs': CFG.num_epochs,
        'batch_size': CFG.batch_size
        },
        project=f'cellvit-{CFG.model_name}',
        prefix='Can-c037_27k'
    )

    # Data augmentation and normalization for training
    # Just normalization for validation

    data_transforms = {
        'train': transforms.Compose([
            transforms.RandomHorizontalFlip(),
            transforms.RandomRotation(degrees=(0, 180)),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
        'dev': transforms.Compose([
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ]),
    }

    image_datasets = {x: MaxVitDataset(CFG, split=x,
                                    transform=data_transforms[x])
                    for x in ['train', 'dev']}
    dataloaders = {x: torch.utils.data.DataLoader(image_datasets[x], 
                                                batch_size=CFG.batch_size,
                                                num_workers=CFG.num_workers,
                                                shuffle=True)
                for x in ['train', 'dev']}
    dataset_sizes = {x: len(image_datasets[x]) for x in ['train', 'dev']}
    # class_names = image_datasets['train'].classes
    print(f"Dataset sizes: {dataset_sizes}")

    device = torch.device("cuda:0" if torch.cuda.is_available() else CFG.device)
    print(device)

    set_seed(CFG)

    model_ft = MaxVitClassifier(CFG)
    model_ft.load_state_dict(torch.load(CFG.model_checkpoint))
    model_ft = model_ft.to(device)

    params_to_update = model_ft.parameters()
    # print("Params to learn:")

    # for name,param in model_ft.named_parameters():
    #     if param.requires_grad == True:
    #             print("\t",name)

    # Observe that all parameters are being optimized
    # optimizer_ft = optim.SGD(model_ft.parameters(), lr=5e-5, momentum=0.9)

    optimizer_ft = AdamW(model_ft.parameters(), lr=CFG.learning_rate, eps=CFG.adam_epsilon, weight_decay=CFG.weight_decay)
    # optimizer_ft.load_state_dict(torch.load(CFG.optimizer_checkpoint))

    # scheduler = lr_scheduler.ReduceLROnPlateau(optimizer_ft, factor=CFG.plateau_factor, patience=CFG.plateau_patience)
    criterion = nn.CrossEntropyLoss()

    print("Starting...\n")
    model_ft, hist = train_model(CFG, model_ft, dataloaders, criterion, optimizer_ft)
