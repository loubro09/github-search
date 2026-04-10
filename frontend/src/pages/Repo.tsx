import { useParams } from "react-router-dom"

export default function Repo() {
    const params = useParams();

    return (
        <div className="project-info">
            <h1>Repo Project Info</h1>
            <div className="project-details">
                <p>{params.id}</p>
            </div>
        </div>
    )
}