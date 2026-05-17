from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api.routes.tasks import router as task_router
from src.api.errors import global_exception_handler

app = FastAPI(title="Todo Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task_router)
app.add_exception_handler(Exception, global_exception_handler)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
