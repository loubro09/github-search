import requests

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

def transform(items):
    result = []

    for repo in items:
        result.append({
            "id": repo["id"],
            "name": repo["name"],
            "full_name": repo["full_name"],
            "owner": {
                "login": repo["owner"]["login"],
                "avatar": repo["owner"]["avatar_url"],
            },
            "private": repo["private"],
            "html_url": repo["html_url"],
            "description": repo["description"],
            "fork": repo["fork"],
            "forks": repo["forks"],
            "created_at": repo["created_at"],
            "updated_at": repo["updated_at"],
            "pushed_at": repo["pushed_at"],
            "stargazers_count": repo["stargazers_count"],
            "language": repo["language"],
            "forks_count": repo["forks_count"],
            "default_branch": repo["default_branch"],
        })

    return result

@app.get("/api/search")
def search(q: str):
    response = requests.get(f"https://api.github.com/search/repositories?q={q}")
    data = response.json()
    items = data["items"]
    return transform(items)