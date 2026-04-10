import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        navigate(`/results?q=${searchValue}`);
    }

    return (
        <div className="searchBar">
            <input
                placeholder="Type to search..."
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <form onSubmit={handleSubmit}>
                <button type="submit">
                    <FaSearch />
                </button>
            </form>
        </div>
    );
} 