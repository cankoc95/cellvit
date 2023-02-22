import matplotlib.pyplot as plt
import numpy as np
import cv2 as cv


N_CHANNELS = 5
DEFAULT_CHANNELS = (1, 2, 3, 4, 5)
RGB_MAP = {
    1: {"rgb": np.array([19, 0, 249]), "range": [0, 51]},
    2: {"rgb": np.array([42, 255, 31]), "range": [0, 107]},
    3: {"rgb": np.array([255, 0, 25]), "range": [0, 64]},
    4: {"rgb": np.array([45, 255, 252]), "range": [0, 191]},
    5: {"rgb": np.array([250, 0, 253]), "range": [0, 89]},
    6: {"rgb": np.array([254, 255, 40]), "range": [0, 191]},
}


def load_image(img_path):
    img = plt.imread(img_path)
    return img * 255


def extract_channel(img_path, channel=1):
    """
    Extract a channel from an image given it's path.
    Assumes that each image in a channel is a square.
    """
    if channel > N_CHANNELS:
        return None

    # img = plt.imread(img_path)
    img = load_image(img_path)
    img_height = img.shape[0]

    return img[:, img_height * (channel - 1) : channel * img_height]


def plot_img_channels(img_path):
    fig, axes = plt.subplots(
        nrows=1, ncols=6, figsize=(15, 3), subplot_kw={"xticks": [], "yticks": []}
    )
    for i, ax in enumerate(axes.flat):
        ax.axis("off")
        ax.set_title("channel {}".format(i + 1))
        ax.imshow(extract_channel(img_path, i + 1), cmap="gray")
    plt.tight_layout()
    plt.show()


def img2tensor(img_path):
    channels = []
    for i in range(N_CHANNELS):
        channels.append(extract_channel(img_path, channel=i + 1))

    return np.stack(channels, axis=2)


def tensor2rgb(t, channels=DEFAULT_CHANNELS, vmax=255, rgb_map=RGB_MAP):
    """
    Converts and returns the image data as RGB image
    Parameters
    ----------
    t : np.ndarray
        original image data
    channels : list of int
        channels to include
    vmax : int
        the max value used for scaling
    rgb_map : dict
        the color mapping for each channel
        See rxrx.io.RGB_MAP to see what the defaults are.
    Returns
    -------
    np.ndarray the image data of the site as RGB channels
    """
    colored_channels = []
    im_height = im_width = t.shape[0]
    for i, channel in enumerate(channels):
        x = (t[:, :, i] / vmax) / (
            (rgb_map[channel]["range"][1] - rgb_map[channel]["range"][0]) / 255
        ) + rgb_map[channel]["range"][0] / 255
        x = np.where(x > 1.0, 1.0, x)
        x_rgb = np.array(
            np.outer(x, rgb_map[channel]["rgb"]).reshape(im_height, im_width, 3),
            dtype=int,
        )
        colored_channels.append(x_rgb)
    im = np.array(np.array(colored_channels).sum(axis=0), dtype=int)
    im = np.where(im > 255, 255, im)
    return im


def plot_channels_rgb_sampled(data, n=5):
    sampled = data.sample(frac=1).reset_index(drop=True)
    fig, axes = plt.subplots(
        nrows=n, ncols=7, figsize=(15, 3 * n), subplot_kw={"xticks": [], "yticks": []}
    )

    for i, ax in enumerate(axes.flat):
        img_path = sampled.Path[i]
        ax.axis("off")
        c = (i + 1) % 7
        if c != 0:
            ax.set_title("channel {}".format(c))
            ax.imshow(extract_channel(img_path, c), cmap="gray")
        else:
            ax.set_title("rgb")
            t = img2tensor(img_path)
            x = tensor2rgb(t)
            ax.imshow(x)

    plt.tight_layout()
    plt.show()
