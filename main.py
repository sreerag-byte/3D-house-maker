from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import shutil
import os

app = FastAPI(title="Arch2Mesh API", version="0.1.0")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.post("/api/upload")
async def upload_images(
    plan: UploadFile = File(...), 
    elevation: UploadFile = File(...)
):
    """
    Phase 1: Receive the floor plan and front elevation images.
    """
    plan_path = os.path.join(UPLOAD_DIR, plan.filename)
    elevation_path = os.path.join(UPLOAD_DIR, elevation.filename)
    
    with open(plan_path, "wb") as buffer:
        shutil.copyfileobj(plan.file, buffer)
        
    with open(elevation_path, "wb") as buffer:
        shutil.copyfileobj(elevation.file, buffer)
        
    return {
        "message": "Images uploaded successfully",
        "jobId": f"job-{os.urandom(4).hex()}",
        "planUrl": f"/uploads/{plan.filename}",
        "elevationUrl": f"/uploads/{elevation.filename}"
    }

if __name__ == "__main__":
    # Note: In the current environment, we are using a Node.js (Express) backend 
    # to serve the application and handle uploads due to container constraints.
    # This file serves as the requested FastAPI skeleton for your reference.
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
