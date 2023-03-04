import pandas as pd
import glob
import os


class DataFetcher:
    cache_dir = "./cache/"
    dataset_name = "moshkov"
    _broad_dir = ""
    _image_paths = []

    @staticmethod
    def _get_sc_metadata():
        metadata_df = pd.read_csv(
            DataFetcher._broad_dir + "/workspace_dl/metadata/sc-metadata.csv",
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

        metadata_df["PathId"] = metadata_df.apply(
            lambda x: x["Image_Name"].split("/")[-1], axis=1
        )
        # Select only the columns specified in columns_to_keep
        return metadata_df[
            [
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
    def fetch(broad_dir):
        DataFetcher._broad_dir = broad_dir
        if not os.path.exists(DataFetcher.cache_dir):
            os.makedirs(DataFetcher.cache_dir)

        data_file = os.path.join(
            DataFetcher.cache_dir, DataFetcher.dataset_name + ".parquet"
        )

        try:
            print(f"First try to load data file if already exists at: {data_file}")
            data = pd.read_parquet(data_file, engine="pyarrow")
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

        metadata_df = DataFetcher._get_sc_metadata()
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
            how="outer",
        )

        print("Converting to parquet")
        metadata_merged_df.to_parquet(data_file, engine="pyarrow")

        try:
            print(f"Try again reading from data file: {data_file}.")
            data = pd.read_parquet(data_file, engine="pyarrow")
        except Exception as e:
            print(f"Error when reading data {e}")

        print(f"{data_file} loaded successfully!")

        return data
