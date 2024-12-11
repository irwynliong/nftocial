from rembg import remove
import os
import cv2
import numpy as np
from PIL import Image

TEST_PATH = 'public/stickers/yusiang.png'

class StickerMaker:
    def __init__(self, input_path):
        self.input_path = input_path
        self.bg_removed_path = input_path.replace('.png', '_bg_removed.png')
        self.outline_path = input_path.replace('.png', '_outline.png')

    def make_sticker(self):
        self._remove_image_background()
        self._add_white_outline()

    def _remove_image_background(self):
        with open(self.input_path, 'rb') as i:
            with open(self.bg_removed_path, 'wb') as o:
                input = i.read()
                output = remove(input)
                o.write(output)
        print(f"Background removed")

    def _add_white_outline(self, outline_thickness=10):
        # Load the image with alpha channel (transparency)
        image = cv2.imread(self.bg_removed_path, cv2.IMREAD_UNCHANGED)
        if image is None:
            raise ValueError("Image not found or invalid format")

        # Extract the alpha channel (transparency mask)
        alpha = image[:, :, 3]

        # Create a binary mask where the object is white (255)
        _, binary_mask = cv2.threshold(alpha, 0, 255, cv2.THRESH_BINARY)

        # Dilate the mask to create an outline
        kernel = np.ones((outline_thickness, outline_thickness), np.uint8)
        dilated_mask = cv2.dilate(binary_mask, kernel, iterations=1)

        # Create a transparent outline image
        outline = np.zeros_like(image, dtype=np.uint8)
        outline[:, :, 3] = dilated_mask  # Transparency for outline
        outline[:, :, :3] = (255, 255, 255)  # White color for outline

        # Create a combined image
        combined = outline.copy()
        combined[:, :, :3] = np.where(
            image[:, :, 3:4] > 0, image[:, :, :3], combined[:, :, :3]
        )  # Overlay original image on top
        combined[:, :, 3] = np.maximum(image[:, :, 3], outline[:, :, 3])  # Combine transparency

        # Save the result
        combined_pil = Image.fromarray(cv2.cvtColor(combined, cv2.COLOR_BGRA2RGBA))
        combined_pil.save(self.outline_path, format="PNG")
        print(f"Sticker saved with white outline at {self.outline_path}")

        
if __name__ == '__main__':
    sm = StickerMaker(TEST_PATH)
    sm.make_sticker()