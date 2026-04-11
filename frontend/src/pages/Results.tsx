import { useSearchParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SearchBar } from "../components/SearchBar"
import { searchRepos } from "../api/search";

import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import './css/Results.css'

type Repo = {
    id: number;
    name: string;
    description: string | null;
    owner: {
        login: string;
        avatar: string;
    };
    updated_at: string;
    stargazers_count: number;
    language: string;
};

export default function Results() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [repos, setRepos] = useState<Repo[]>([]);

    const [likedRepos, setLikedRepos] = useState<Record<number, boolean>>({});

    const toggleLike = (id: number) => {
        setLikedRepos(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    function handleClickRepo(repo: Repo) {
        navigate(`/repo/${repo.owner.login}/${repo.name}`)
    }

    function timeAgo(value: string) {
        const date = new Date(value);

        const now = new Date()

        const diff = Math.floor(now.getTime() - date.getTime());

        const minute = 1000 * 60;
        const hour = minute * 60;
        const day = hour * 24;
        const month = day * 30;
        const year = month * 12;

        let dateForm = "";

        if (diff < minute) {
            const seconds = Math.floor(diff / 1000);
            dateForm = `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
        } else if (diff < hour) {
            const minutes = Math.floor(diff / minute);
            dateForm = `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
        } else if (diff < day) {
            const hours = Math.floor(diff / hour);
            dateForm = `${hours} hour${hours !== 1 ? "s" : ""}  ago`;
        } else if (diff < month) {
            const days = Math.floor(diff / day);
            dateForm = `${days} day${days !== 1 ? "s" : ""}  ago`;
        } else if (diff < year) {
            const months = Math.floor(diff / month);
            dateForm = `${months} month${month !== 1 ? "s" : ""}  ago`;
        } else {
            const years = Math.floor(diff / year);
            dateForm = `${years} year${year !== 1 ? "s" : ""}  ago`;
        }

        return dateForm;
        
    }

    useEffect(() => {
        async function load() {
            if (!query || loading) return;

            setLoading(true);

            const data = await searchRepos(query, page);

            setRepos(prev => [...prev, ...data]);

            setLoading(false);
        }

        load()
    }, [query, page])

    useEffect(() => {
        setRepos([]);
        setPage(1);
    }, [query]);

    useEffect(() => {
        function handleScroll() {
            if (loading) return;

            //kollar om användaren scrollat till nära botten av sidan
            const bottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200;

            if (bottom && !loading) {
                setPage (prev => prev + 1);
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading]);

    return (
        <div className="search-results">
            <SearchBar />
            <div className="results-">
                <h1>Search Results</h1>
                <div className="repo-list">
                    <ul>
                        {repos.map(repo =>
                            <li
                                key={repo.id}
                                className="repo-card"
                                onClick={() => handleClickRepo(repo)}
                            >
                                <div className="repo-header">
                                    <button
                                        className="repo-button"
                                        type="button"
                                        onClick={() => {handleClickRepo(repo)}}
                                    >
                                        {repo.name}
                                    </button>

                                    <span
                                        className="heart-wrapper"
                                        onClick={() => toggleLike(repo.id)}
                                    >
                                        {likedRepos[repo.id] ? (
                                            <FaHeart className="heart liked" />
                                        ) : (
                                            <FiHeart className="heart" />
                                        )}
                                    </span>
                                </div>

                                <div className="repo-owner">
                                    <p className="repo-login">
                                        {repo.owner.login}
                                    </p>

                                    {repo.owner.avatar && (
                                        <img
                                            src={repo.owner.avatar}
                                            alt={repo.owner.login}
                                            className="repo-avatar"
                                        />
                                    )}
                                </div>

                                <div className="repo-date">
                                    <span>
                                        Updated at: {timeAgo(repo.updated_at)}
                                    </span>
                                </div>

                                <div className="repo-meta">
                                    <span className="repo-stars">
                                        ⭐ {repo.stargazers_count}
                                    </span>

                                    {repo.language && (
                                        <span className="repo-language">
                                            {repo.language}
                                        </span>
                                    )}
                                </div>

                                {repo.description && (
                                    <p className="repo-description">
                                        {repo.description}
                                    </p>
                                )}
                            </li>
                        )}
                    </ul>
                </div>
            </div>

            {loading && <p>Loading...</p>}

        </div>
    )
}