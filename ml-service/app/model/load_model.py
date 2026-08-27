from pathlib import Path
import tensorflow as tf

MODEL_PATH = Path(__file__).resolve().parents[2] / "weights" / "cifake_model.keras"

_model = None

def get_model():
    global _model
    if _model is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError(
                f"Model not found at {MODEL_PATH}. Train the model first with ml-service/train.py."
            )
        _model = tf.keras.models.load_model(MODEL_PATH)
    return _model