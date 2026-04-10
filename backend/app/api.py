from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI() #skapar applikationsobjektet (app=server)

origins = [ #tillåtna frontend-adresser
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware, #middleware hanterar CORS åt oss
    allow_origins=origins, #vilka frontend-adresser som får göra requests
    allow_credentials=True, #tillåter cookies / auth headers
    allow_methods=["*"], #tillåter get, post, put etc
    allow_headers=["*"] #tillåter alla headers
)

#skapar en route / endpoint
@app.get("/", tags=["root"]) #tags används i Swagger docs
def read_root() -> dict:
    return {"message": "GitHub Project Searcher"}