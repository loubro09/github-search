const baseUrl = "http://localhost:8000";

export async function getRepository(owner: string, repo_name: string) {
    const response = await fetch(`${baseUrl}/api/repository?owner=${owner}&repo_name=${repo_name}`);

    if (!response.ok) {
        throw new Error("Failed to fetch repos");
    }

    const data = await response.json();

    return data;
}