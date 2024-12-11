// Define the API endpoint URL
const API_URL = "http://localhost:8000/generate-sticker"; // Replace with your Flask server URL

// Function to call the Flask API
async function generateSticker(inputPath: string): Promise<string> {
  try {
    // Create the form data to send in the POST request
    const formData = new FormData();
    formData.append("input_path", inputPath);

    // Make the POST request to the Flask API
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to generate sticker");
    }

    // Parse the JSON response
    const data = await response.json();
    return data.output_path;
  } catch (error) {
    console.error("Error generating sticker:", error);
    throw error;
  }
}

export default generateSticker;
