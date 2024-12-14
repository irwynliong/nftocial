// Define the API endpoint URL
const generate_sticker_url = "http://localhost:8000/generate-sticker"; // Replace with your Flask server URL
const save_image_url = "http://localhost:8000/save-image"; // Replace with your Flask server URL

// Function to save NFT image to the local filesystem
async function saveNFTImage(src: string, filename: string): Promise<void> {
  try {
    // Create the form data to send in the POST request
    const formData = new FormData();
    formData.append("src", src);
    formData.append("dest", filename);

    // Make the POST request to the Flask API
    const response = await fetch(save_image_url, {
      method: "POST",
      body: formData,
    });

    // Check if the response is okay
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to save image");
    }
  }
  catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
}

// Function to call the Flask API
async function generateSticker(name: string, src: string): Promise<string> {
  try {
    const parsed_name = name.replace(/\s/g, "_").toLowerCase();
    const inputPath = `/Users/bingsu/Desktop/work/projects/nftocial/public/nfts/${parsed_name}.png`;
    await saveNFTImage(src, inputPath);
    // Create the form data to send in the POST request
    const formData = new FormData();
    formData.append("input_path", inputPath);

    // Make the POST request to the Flask API
    const response = await fetch(generate_sticker_url, {
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
