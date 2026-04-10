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

githubBaseApi = "https://api.github.com"

def transformResult(items):
    result = []

    for repo in items:
        result.append({
            "id": repo["id"],
            "name": repo["name"],
            "owner": {
                "login": repo["owner"]["login"],
                "avatar": repo["owner"]["avatar_url"],
            },
            "html_url": repo["html_url"],
            "description": repo["description"],
            "updated_at": repo["updated_at"],
            "stargazers_count": repo["stargazers_count"],
            "language": repo["language"],
        })

    return result

def transformRepo(data):
    return {
        "id": data["id"],
        "name": data["name"],
        "full_name": data["full_name"],
        "owner": {
            "login": data["owner"]["login"],
            "avatar": data["owner"]["avatar_url"],
        },
        "private": data["private"],
        "html_url": data["html_url"],
        "description": data["description"],
        "fork": data["fork"],
        "forks": data["forks"],
        "created_at": data["created_at"],
        "updated_at": data["updated_at"],
        "pushed_at": data["pushed_at"],
        "stargazers_count": data["stargazers_count"],
        "language": data["language"],
        "default_branch": data["default_branch"],
    }


@app.get("/api/search")
def search(q: str):
    response = requests.get(f"{githubBaseApi}/search/repositories?q={q}")
    data = response.json()
    items = data["items"]
    return transformResult(items)

@app.get("/api/repository")
def get_repo(owner: str, repo_name: str):
    response = requests.get(f"{githubBaseApi}/repos/{owner}/{repo_name}")
    data = response.json()
    return transformRepo(data)