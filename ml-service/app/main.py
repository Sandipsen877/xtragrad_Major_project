from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import random
import time

app = FastAPI(
    title="FakeVision ML Service",
    description="AI-Generated Image Detection API",
    version="1.0.0"
)

# Allow frontend & Express backend to call this service
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later you can restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "FakeVision ML Service is running",
        "status": "active"
    }

@app.get("/health")
def health():
    return {
        "status": "OK",
        "service": "ml-service"
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        # Validate file type
        if not file.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail="File must be an image")

        # Read file (we will process it later)
        contents = await file.read()

        # ============================================
        # TEMPORARY MOCK RESPONSE
        # Later we will replace this with real model
        # ============================================
        time.sleep(1.5)  # simulate model inference time

        is_fake = random.random() > 0.45
        confidence = round(random.uniform(0.78, 0.98), 4)

        result = {
            "success": True,
            "label": "Fake" if is_fake else "Real",
            "confidence": confidence,
            "heatmap": None,          # will send base64 heatmap later
            "message": "Prediction successful (mock mode)"
        }

        return JSONResponse(content=result)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the server
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)