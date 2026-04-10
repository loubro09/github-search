import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";

import { getRepository } from "../api/repo";

type Repo = {
    id: number;
    name: string;
    description: string | null;
    owner: {
        login: string;
    };
};

export default function Repo() {
    const { owner, repo } = useParams();

    const [newRepo, setRepo] = useState<Repo | null>(null);

    useEffect(() => {
            async function load() {
                if (owner != null && repo != null) {
                    const data = await getRepository(owner, repo)
                    setRepo(data)
                }
            }
            load()
        }, [owner, repo])

    return (
        <div className="project-info">
            <h1>Repo Project Info</h1>
            <div className="project-details">
                <p>{newRepo?.name}</p>
            </div>
        </div>
    )
}