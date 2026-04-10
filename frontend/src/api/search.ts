const baseUrl = "http://localhost:8000";

export async function searchRepos(query: string) {
    const response = await fetch(`${baseUrl}/api/search?q=${query}`);

    if (!response.ok) {
        throw new Error("Failed to fetch repos");
    }

    const data = await response.json();

    return data;
}