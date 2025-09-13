from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.controllers import advisory

app = FastAPI(
    title="AgroBot Assessment Project",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # allow all origins (React frontend)
    allow_credentials=True,
    allow_methods=["*"],        # allow GET, POST, PUT, DELETE
    allow_headers=["*"],        # allow all headers
)

app.include_router(advisory.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)