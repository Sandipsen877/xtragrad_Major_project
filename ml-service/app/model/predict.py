import numpy as np
from PIL import Image
import io
import random
from .load_model import get_model

def preprocess_image(image_bytes):
    """
    Preprocess image for the model (32x32 for CIFAKE style)
    """
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    image = image.resize((32, 32))
    img_array = np.array(image) / 255.0
    img_array = np.expand_dims(img_array, axis=0)  # shape: (1, 32, 32, 3)
    return img_array

def predict_image(image_bytes: bytes):
    model, is_loaded = get_model()

    # ==============================
    # MOCK MODE (when no model file)
    # ==============================
    if not is_loaded or model is None:
        is_fake = random.random() > 0.45
        confidence = round(random.uniform(0.78, 0.97), 4)

        return {
            "success": True,
            "label": "Fake" if is_fake else "Real",
            "confidence": confidence,
            "heatmap": None,
            "message": "Prediction successful (MOCK mode - no model loaded)"
        }

    # ==============================
    # REAL MODEL MODE
    # ==============================
    try:
        processed = preprocess_image(image_bytes)
        prediction = model.predict(processed, verbose=0)

        # Assuming binary classification: output shape (1, 1) with sigmoid
        # 0 = Fake, 1 = Real  (adjust if your model is opposite)
        score = float(prediction[0][0])

        if score >= 0.5:
            label = "Real"
            confidence = score
        else:
            label = "Fake"
            confidence = 1 - score

        return {
            "success": True,
            "label": label,
            "confidence": round(confidence, 4),
            "heatmap": None,          # Grad-CAM later
            "message": "Prediction successful (Real Model)"
        }

    except Exception as e:
        return {
            "success": False,
            "label": None,
            "confidence": None,
            "heatmap": None,
            "message": f"Model prediction failed: {str(e)}"
        }