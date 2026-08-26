from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.model.load_model import load_model
from app.model.predict import predict_image

app = FastAPI(
    title="FakeVision ML Service",
    description="AI-Generated Image Detection API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model at startup
@app.on_event("startup")
def startup_event():
    load_model()

@app.get("/")
def root():
    return {
        "message": "FakeVision ML Service is running",
        "status": "active"
    }

@app.get("/health")
def health():
    from app.model.load_model import MODEL_LOADED
    return {
        "status": "OK",
        "service": "ml-service",
        "model_loaded": MODEL_LOADED
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        contents = await file.read()
        result = predict_image(contents)

        return JSONResponse(content=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))