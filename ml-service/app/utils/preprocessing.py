import io
import numpy as np
from PIL import Image

IMAGE_SIZE = (32, 32)

def load_image(data: bytes):
    image = Image.open(io.BytesIO(data)).convert("RGB")
    resized = image.resize(IMAGE_SIZE, Image.Resampling.BILINEAR)
    array = np.asarray(resized, dtype=np.float32) / 255.0
    return image, np.expand_dims(array, axis=0)