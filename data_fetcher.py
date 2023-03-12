import pandas as pd
import glob
import os
from datasets import Dataset


class DataFetcher:
    cache_dir = "./cache/"
    dataset_name = "moshkov"
    c037_dataset_name = "c037_14k"
    _broad_dir = ""
    _image_paths = []
    _class_labels_to_int = {}

    @staticmethod
    def _get_image_paths():
        if len(DataFetcher._image_paths) == 0:
            DataFetcher._image_paths = list(
                glob.glob(
                    DataFetcher._broad_dir + "/training_images/**/*.png", recursive=True
                )
            )

        return DataFetcher._image_paths


    @staticmethod
    def create_train_dev_split(data, output_dir, dev_size=0.2):
      """
      Creates train and dev split

      Before calling this function it's a good idea to call clean and then add channels into the data.
      """
      train_outputdir = output_dir + "/train"
      dev_outputdir = output_dir + "/dev"

      train_dev_splitted = Dataset.from_pandas(data).train_test_split(test_size=dev_size)
      dev_Ds = train_dev_splitted['test']
      train_Ds = train_dev_splitted['train']

      dev_df = dev_Ds.to_pandas()
      train_df = train_Ds.to_pandas()
      
      if not os.path.exists(dev_outputdir):
        os.makedirs(dev_outputdir)

      dev_df.to_parquet(dev_outputdir + "/data.parquet", engine="pyarrow")

      print(f"Saved dev data with shape {dev_df.shape} to {dev_outputdir}")

      if not os.path.exists(train_outputdir):
          os.makedirs(train_outputdir)

      train_df.to_parquet(train_outputdir + "/data.parquet", engine="pyarrow")

      print(f"Saved train data with shape {train_df.shape} to {train_outputdir}")

    @staticmethod
    def clean_data(data):
      data_cleaned = data.dropna()
      return data_cleaned

    @staticmethod
    def repeat_channels(data):
      n = data.shape[0]
      data = data.loc[data.index.repeat(5)]
      data["Channel"] = [1, 2, 3, 4, 5]*(n)
      return data

    @staticmethod
    def get_sc_metadata(broad_dir):
        metadata_df = pd.read_csv(
            broad_dir + "/workspace_dl/metadata/sc-metadata.csv",
            dtype={
                "Collection": str,
                "Metadata_Plate": str,
                "Metadata_Well": str,
                "Metadata_Site": str,
                "Image_Name": str,
                "Treatment": str,
                "Treatment_Type": str,
                "Control": str,
                "LeaveReplicatesOut": str,
                "LeaveCellsOut": str,
            },
        )

        return metadata_df

    @staticmethod
    def get_labels_dict(metadata):
      # Select only the columns specified in columns_to_keep
      class_labels = metadata.Treatment.unique().tolist()
      class_labels.sort()
      DataFetcher._class_labels_to_int = {}

      for i, lab in enumerate(class_labels):
        DataFetcher._class_labels_to_int[lab] = i

      return DataFetcher._class_labels_to_int

    @staticmethod
    def fetch(broad_dir):
        print("Started")
        DataFetcher._broad_dir = broad_dir
        if not os.path.exists(DataFetcher.cache_dir):
            os.makedirs(DataFetcher.cache_dir)

        data_file = os.path.join(
            DataFetcher.cache_dir, DataFetcher.dataset_name + ".parquet"
        )

        try:
            print(f"First try to load data file if already exists at: {data_file}")
            data = pd.read_parquet(data_file, engine="pyarrow")
            return data
        except Exception:
            print("Couldn't read parquet file, attempting to create it.")

        image_paths = DataFetcher._get_image_paths()

        print(f"Image paths size: {len(image_paths)}")

        path_df = pd.DataFrame()
        for fp in image_paths:
            items = fp.split("/")[-5:]
            d = {
                "Collection": items[0],
                "Metadata_Plate": items[1],
                "Metadata_Well": items[2],
                "Metadata_Site": items[3],
                "PathId": items[4],
                "Path": fp,
            }
            path_df = path_df.append(d, ignore_index=True)

        metadata_df = DataFetcher.get_sc_metadata(broad_dir)
        metadata_df["PathId"] = metadata_df.apply(
            lambda x: x["Image_Name"].split("/")[-1], axis=1
        )
        metadata_df = metadata_df[[
                "Collection",
                "Metadata_Plate",
                "Metadata_Well",
                "Metadata_Site",
                "Image_Name",
                "PathId",
                "Treatment",
                "Treatment_Type",
                "Control",
                "LeaveReplicatesOut",
                "LeaveCellsOut",
                ]
        ]

        DataFetcher.get_labels_dict(metadata_df)  # Will setup class variable for mapping labels to int

        metadata_merged_df = pd.merge(
            metadata_df,
            path_df,
            on=[
                "Collection",
                "Metadata_Plate",
                "Metadata_Well",
                "Metadata_Site",
                "PathId",
            ],
            how="left", # should we change to outer join?
        )

        metadata_merged_df['labels'] = metadata_merged_df["Treatment"].replace(
          to_replace=DataFetcher._class_labels_to_int)

        print("Converting to parquet")
        metadata_merged_df.to_parquet(data_file, engine="pyarrow")

        try:
            print(f"Try again reading from data file: {data_file}.")
            data = pd.read_parquet(data_file, engine="pyarrow")
        except Exception as e:
            print(f"Error when reading data {e}")

        print(f"{data_file} loaded successfully!")

        return data

    @staticmethod
    def fetchBBBC037(broad_dir, metadata_file):
        """
        Creates or loads a new dataframe where metadata is combined with paths to the images.

        broad_dir: Path to broad data dir.
        metadata_file: Path to c037_10k_metadata.parquet file.
        """
        DataFetcher._broad_dir = broad_dir
        if not os.path.exists(DataFetcher.cache_dir):
            os.makedirs(DataFetcher.cache_dir)

        data_file = os.path.join(
            DataFetcher.cache_dir, DataFetcher.c037_dataset_name + ".parquet"
        )

        try:
            print(f"First try to load data file if already exists at: {data_file}")
            data = pd.read_parquet(data_file, engine="pyarrow")
            return data
        except Exception:
            print("Couldn't read parquet file, attempting to create it.")
        
        image_paths = DataFetcher._get_image_paths()

        print(f"Image paths size: {len(image_paths)}")

        path_df = pd.DataFrame()
        for fp in image_paths:
            items = fp.split("/")[-5:]
            d = {
                "Collection": items[0],
                "Metadata_Plate": items[1],
                "Metadata_Well": items[2],
                "Metadata_Site": items[3],
                "PathId": items[4],
                "Path": fp,
            }
            path_df = path_df.append(d, ignore_index=True)

        metadata_df = pd.read_parquet(metadata_file, engine="pyarrow")
        metadata_df = metadata_df[[
                "Collection",
                "Metadata_Plate",
                "Metadata_Well",
                "Metadata_Site",
                "Image_Name",
                "PathId",
                "Treatment",
                "Treatment_Type",
                "Control",
                "LeaveReplicatesOut",
                "LeaveCellsOut",
                ]
        ]

        DataFetcher.get_labels_dict(metadata_df)  # Will setup class variable for mapping labels to int

        metadata_merged_df = pd.merge(
            metadata_df,
            path_df,
            on=[
                "Collection",
                "Metadata_Plate",
                "Metadata_Well",
                "Metadata_Site",
                "PathId",
            ],
            how="inner",  # Assumes that all of our custom c037 data is available.
        )

        metadata_merged_df['Labels'] = metadata_merged_df["Treatment"].replace(
          to_replace=DataFetcher._class_labels_to_int)

        print("Converting to parquet")
        metadata_merged_df.to_parquet(data_file, engine="pyarrow")

        try:
            print(f"Try again reading from data file: {data_file}.")
            data = pd.read_parquet(data_file, engine="pyarrow")
        except Exception as e:
            print(f"Error when reading data {e}")

        print(f"{data_file} loaded successfully!")

        return data
