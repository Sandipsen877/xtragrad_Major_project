import os
from pathlib import Path

MODEL = None
MODEL_LOADED = False

def load_model():
    """
    Try to load a trained model.
    If model file is not found, keep MODEL = None (mock mode).
    """
    global MODEL, MODEL_LOADED

    model_path = Path("app/model/cifake_model.h5")  # change name if needed

    if not model_path.exists():
        print("⚠ Model file not found. Running in MOCK mode.")
        MODEL = None
        MODEL_LOADED = False
        return None

    try:
        import tensorflow as tf
        MODEL = tf.keras.models.load_model(str(model_path))
        MODEL_LOADED = True
        print("✅ Model loaded successfully!")
        return MODEL
    except Exception as e:
        print(f"❌ Failed to load model: {e}")
        MODEL = None
        MODEL_LOADED = False
        return None

def get_model():
    return MODEL, MODEL_LOADED