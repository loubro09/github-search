import { useSearchParams } from "react-router-dom"

import { SearchBar } from "../components/SearchBar"

export default function Results() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    return (
        <div>
            <h1>Search Results</h1>
            <SearchBar />
            <p>{query}</p>
        </div>
    )
}