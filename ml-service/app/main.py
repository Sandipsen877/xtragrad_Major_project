from fastapi import FastAPI, File, UploadFile, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware

from app.utils.preprocessing import load_image
from app.model.predict import predict_array
from app.gradcam.generate_heatmap import generate_gradcam

app = FastAPI(title="CIFAKE ML Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok", "service": "ml-service", "model_loaded": MODEL_LOADED}

@app.post("/predict")
async def predict(file: UploadFile = File(...), explain: bool = Form(True)):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=413, detail="Image exceeds 10 MB.")

    try:
        original, batch = load_image(data)
        result = predict_array(batch)

        if explain:
            result["gradcam"] = generate_gradcam(original, batch)

        return result
    except FileNotFoundError as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Could not process image: {exc}")