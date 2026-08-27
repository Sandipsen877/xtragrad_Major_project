import base64
import io
import numpy as np
import cv2
from PIL import Image
import tensorflow as tf

from app.model.load_model import get_model

def find_last_conv_layer(model):
    for layer in reversed(model.layers):
        if isinstance(layer, tf.keras.layers.Conv2D):
            return layer.name
    raise ValueError("No Conv2D layer found for Grad-CAM.")

def generate_gradcam(image_rgb: Image.Image, batch: np.ndarray) -> str:
    model = get_model()
    last_conv = find_last_conv_layer(model)

    grad_model = tf.keras.models.Model(
        inputs=model.inputs,
        outputs=[model.get_layer(last_conv).output, model.output]
    )

    with tf.GradientTape() as tape:
        conv_output, prediction = grad_model(batch)
        score = prediction[:, 0]

    gradients = tape.gradient(score, conv_output)
    weights = tf.reduce_mean(gradients, axis=(1, 2))
    cam = tf.reduce_sum(conv_output * weights[:, None, None, :], axis=-1)
    cam = tf.maximum(cam, 0)[0]
    max_value = tf.reduce_max(cam)

    if float(max_value) > 0:
        cam = cam / max_value

    heat = (cam.numpy() * 255).astype(np.uint8)
    heat = cv2.resize(heat, image_rgb.size, interpolation=cv2.INTER_LINEAR)
    heat_color = cv2.applyColorMap(heat, cv2.COLORMAP_JET)
    heat_color = cv2.cvtColor(heat_color, cv2.COLOR_BGR2RGB)

    original = np.asarray(image_rgb, dtype=np.uint8)
    overlay = cv2.addWeighted(original, 0.55, heat_color, 0.45, 0)

    output = io.BytesIO()
    Image.fromarray(overlay).save(output, format="JPEG", quality=90)
    encoded = base64.b64encode(output.getvalue()).decode("ascii")
    return f"data:image/jpeg;base64,{encoded}"