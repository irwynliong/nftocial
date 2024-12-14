const fetch_sticker_url = "http://localhost:8000/fetch-stickers"; // Replace with your Flask server URL

// Function to call the Flask API
async function fetchStickers(): Promise<Array<string>> {
    try {
        // Make the GET request to the Flask API
        const response = await fetch(fetch_sticker_url);

        // Check if the response is okay
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to fetch stickers");
        }

        // Parse the JSON response
        const data = await response.json();
        return data.stickers;
    } catch (error) {
        console.error("Error fetching stickers:", error);
        throw error;
    }
}

export default fetchStickers;