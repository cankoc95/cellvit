import numpy as np
import cv2
import os


def convert_img_to_5_channel_array(img_path: str, square_size:int, image_size: int):
  '''
    Converts an image to a 5 channel array.

    Parameters
    ----------
    img_path : str
        The path to the image.
    square_size : int
        The size of the square to remove from the bottom of the image.
    image_size : int
        The size of the image to convert to.

    Returns
    -------
    numpy.ndarray
        The 5 channel array.
    
  '''
  # log the image treatment label
  treatment_label = (img_path.split('/')[-2])
  # convert image to numpy ndarray
  raw_image = np.array(cv2.imread(img_path))
  # remove redundant channels and the 6th channel (i.e. last square of the raw image)
  trimmed_image = raw_image[:, :-square_size, 0]
  # convert to the specified image size
  resized_image = cv2.resize(trimmed_image, (image_size*5, image_size))
  # split the image into the 5 fluorescent channels
  five_channel_array = np.array(np.hsplit(resized_image, 5))
  # convert to tensor and normalize to 0-1 range
  # five_channel_tensor = (torch.from_numpy(split_image))/255
  # split the image into the 5 fluorescent channels
  return five_channel_array, treatment_label


def get_all_file_paths(directory):
  '''
    Get all file paths in a directory.

    Parameters
    ----------
    directory : str
        The directory to be traversed.

    Returns
    -------
    list
        A list of file paths.

    Examples
    --------
    >>> get_all_file_paths('/home/user/')
    ['/home/user/file1.txt', '/home/user/file2.txt', ...]

  '''
  # initializing empty file paths list
  file_paths = []
  # crawling through directory and subdirectories
  for root, directories, files in (os.walk(directory)):
    for filename in files:
      # ignore hidden files
      if filename[0] != '.':
        filepath = os.path.join(root, filename)
        file_paths.append(filepath)
  return file_paths


def get_unique_treatment_labels(directory):
  label_directories = os.listdir(directory)
  treatment_labels = []
  # iterate over all the labels in the directory
  for i in label_directories:
    treatment_labels.append(i.split('/')[-2])
  return list(set(treatment_labels))


def get_model_input_arrays(data_path: str, directory_list=['test','val','train'], square_size=160, image_size=224):
  '''
  This function takes a root path, collection, and image parameters and returns a tuple of 5 channel arrays for training, validation, and test sets.

  Parameters:
    data_path (str): the root path to the image directory
    square_size (int): the size of the square to remove from the bottom of the image
    image_size (int): the size of the image to convert to
  '''
  # initialize empty lists for the training, validation, and test sets
  X_train, y_train, X_val, y_val, X_test, y_test = [], [], [], [], [], []

  for i in directory_list:
    # initialize empty lists for looping through the images
    X_list_tmp, y_list_tmp = [], []
    print("Starting to convert images to 5 channel arrays for: " + i)
    
    # get a complete list of all absolute image paths
    img_paths = get_all_file_paths(data_path + "/" + i)

    # convert images to 5 channel np.ndarray, get treatment label, and append to the appropriate list
    # print("Starting to convert images to 5 channel arrays for: " + i)
    for j in img_paths:
      # takes in the 160x960 image and returns a 5 channel array of the specified image size
      img_tuple = convert_img_to_5_channel_array(j, square_size, image_size)
      X_list_tmp.append(img_tuple[0])
      y_list_tmp.append(img_tuple[1])
      if len(X_list_tmp) % 5000 == 0:
        print("Processed " + str(len(X_list_tmp)) + " images for " + i + " set.")
        print(len(X_list_tmp), len(y_list_tmp), X_list_tmp[-1].shape, y_list_tmp[-1])
    # save the lists as numpy arrays
    if i == "train":
      X_train = np.array(X_list_tmp)
      y_train = np.array(y_list_tmp)
    elif i == "val":
      X_val = np.array(X_list_tmp)
      y_val = np.array(y_list_tmp)
    elif i == "test":
      X_test = np.array(X_list_tmp)
      y_test = np.array(y_list_tmp)
    else:
      print("Error: invalid directory")

  return X_train, y_train, X_val, y_val, X_test, y_test