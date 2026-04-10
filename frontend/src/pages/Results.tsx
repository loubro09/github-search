import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { SearchBar } from "../components/SearchBar"
import { searchRepos } from "../api/search";

type Repo = {
    id: number;
    name: string;
    description: string | null;
};

export default function Results() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [repos, setRepos] = useState<Repo[]>([]);

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
            <p>{repo.name}</p>
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