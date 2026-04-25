export async function getStories() {
  try {
    const response = await fetch("https://your-api.mockapi.io/stories");
    if (!response.ok) throw new Error("Failed to fetch stories");
    return await response.json();
  } catch (error) {
    console.error("Error fetching stories:", error);
    return [];
  }
}
