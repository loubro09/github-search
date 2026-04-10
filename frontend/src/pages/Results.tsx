import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "../components/SearchBar"
import { searchRepos } from "../api/search";

type Repo = {
    id: number;
    name: string;
    description: string | null;
};

export default function Results() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [repos, setRepos] = useState<Repo[]>([]);

    function handleClickRepo(repo: Repo) {
        navigate(`/repo/${repo.id}`);
    }

    useEffect(() => {
        async function load() {
            if (query != null) {
                const data = await searchRepos(query)
                setRepos(data)
            }
        }
        load()
    }, [query])

    const list_repos = repos.map(repo =>
        <div key={repo.id}>
            <button
                onClick={() => {handleClickRepo(repo)}}
            >
                {repo.name}
            </button>
            <p>{repo.description ?? "No description"}</p>
        </div>
    )

    return (
        <div>
            <SearchBar />
            <div className="results">
                <h1>Search Results</h1>
                <div className="repo_list">
                    {list_repos}
                </div>
            </div>
        </div>
    )
}