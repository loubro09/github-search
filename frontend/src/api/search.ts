const baseUrl = "http://localhost:8000";

export async function searchRepos(query: string, page: number) {
    const response = await fetch(
        `${baseUrl}/api/search?q=${query}&page=${page}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch repos");
    }

    const data = await response.json();

    return data;
}