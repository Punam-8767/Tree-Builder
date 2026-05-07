from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import Base, engine
from app.api.routes.tree_routes import router as tree_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AIMonk Tree API",
    version="1.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(tree_router)


@app.get("/")
def health_check():
    return {
        "status": "running",
        "message": "AIMonk Backend Running"
    }