import numpy as np
from .load_model import get_model

# Report convention: 0 = Fake, 1 = Real.
def predict_array(batch):
    model = get_model()
    probability_real = float(np.asarray(model.predict(batch, verbose=0)).reshape(-1)[0])
    probability_real = max(0.0, min(1.0, probability_real))

    if probability_real >= 0.5:
        label = "Real"
        confidence = probability_real
    else:
        label = "Fake"
        confidence = 1.0 - probability_real

    return {
        "label": label,
        "confidence": confidence * 100.0,
        "probability_real": probability_real,
        "probability_fake": 1.0 - probability_real
    }