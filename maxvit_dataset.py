import pandas as pd
import numpy as np
import torch
import cv2

class MaxVitDataset(torch.utils.data.Dataset):
    def __init__(self, cfg, split, transform=None, target_transform=None):
        assert split in ['test', 'dev', 'train']
  
        self.data_dir = cfg.data_dir
        self.split = split
        self.image_size = cfg.img_size
        self.transform = transform
        self.target_transform = target_transform
        self.__load_data()

    def __len__(self):
        return len(self.img_labels)

    def __getitem__(self, idx):
        img_path = self.img_paths[idx]
        channel = self.img_channels[idx]  # in [1, 5].
        image = self.__read_image(img_path, channel)
        label = int(self.img_labels[idx])
  
        if self.transform:
            image = self.transform(image)
        if self.target_transform:
            label = self.target_transform(label)

        return image, label
    
    def __read_image(self, img_path, channel):
      raw_image = cv2.imread(img_path, 0) # 0 to read in grayscale
      # calculate the square size of the raw image assuming it is a 1x6 grid
      square_size = int(len(raw_image[0,:])/6)
      # remove the 6th channel (i.e. last square of the raw image)
      gray_image = raw_image[:, :-square_size]
      img = np.array(np.hsplit(gray_image, 5))[channel-1]
      img_resized = cv2.resize(img, (self.image_size, self.image_size))
      img_rgb = (np.stack([img_resized, img_resized, img_resized], axis=2) / 255.).astype(np.float32)
      return torch.from_numpy(img_rgb).permute(2, 0, 1)

    def __load_data(self):
        df = pd.read_parquet(f"{self.data_dir}/{self.split}/data.parquet", engine="pyarrow", columns=["Labels", "Path", "Channel"])
        self.img_labels = df['Labels'].to_list()
        self.img_paths = df['Path'].to_list()
        self.img_channels = df['Channel'].to_list()
        del df

