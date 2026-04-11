import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import './css/SearchBar.css'

import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [searchValue, setSearchValue] = useState(query);

    useEffect(() => {
        setSearchValue(query);
    }, [query]);

    const navigate = useNavigate();

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        if (searchValue != null && searchValue != "") {
            navigate(`/results?q=${searchValue}`);
        }
    }

    return (
        <div className="searchBar">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Type to search..."
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                />
                <button type="submit">
                    <FaSearch />
                </button>
            </form>
        </div>
    );
} 