import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // Define the path to the stickers directory
    const stickersDirectory = path.join(process.cwd(), 'public/stickers');
    // Get the list of sticker files in the stickers directory
    fs.readdir(stickersDirectory, (err, files) => {
        if (err) {
            console.error('Error reading stickers directory:', err);
            res.status(500).json({ error: 'Failed to read stickers directory' });
            return;
        }
        const desired_extension = '_outline.png';
        // Filter the list of files to only include image files
        const imageFiles = files.filter(file => file.endsWith(desired_extension));
        // Return the list of image files as the response
        res.status(200).json({ stickers: imageFiles });
    }   
    );
}