from flask import Flask, request, jsonify
import subprocess
from stickermaker import StickerMaker
from flask_cors import CORS
import json
import requests
import os

app = Flask(__name__)
CORS(app)

SAMPLE_DATA_PATH = 'public/data/sample_nft_data.json'

with open(SAMPLE_DATA_PATH) as f:
    sample_nft_data = json.load(f)

@app.route('/fetch-stickers', methods=['GET'])
def fetch_stickers():
    src = 'public/nfts'
    stickers = []
    for root, _, files in os.walk(src):
        for file in files:
            if file.endswith('_outline.png'):
                stickers.append(os.path.join(root, file))
    print(stickers)
    return jsonify({'stickers': stickers})


@app.route('/save-image', methods=['POST'])
def save_image():
    src = request.form.get('src')
    if not src:
        return jsonify({'error': 'src is required'}), 400
    dest = request.form.get('dest')
    if not dest:
        return jsonify({'error': 'dest is required'}), 400
    try:
        response = requests.get(src)
        if response.status_code != 200:
            return jsonify({'error': 'Failed to download image'}), 500
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, 'wb') as f:
            f.write(response.content)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    return jsonify({'message': 'Image saved successfully'})

@app.route('/generate-sticker', methods=['POST'])
def generate_sticker():
    input_path = request.form.get('input_path')
    if not input_path:
        return jsonify({'error': 'input_path is required'}), 400
    sm = StickerMaker(input_path)
    sm.make_sticker()
    output_path = sm.outline_path
    if not output_path:
        return jsonify({'error': 'Failed to generate sticker'}), 500
    return jsonify({'output_path': output_path})

@app.route('/acquire_wallet_nfts', methods=['POST'])
def acquire_wallet_nfts():
    wallet_address = request.form.get('wallet_address')
    if not wallet_address:
        return jsonify({'error': 'wallet_address is required'}), 400
    try:
        output = subprocess.check_output(['python', 'acquire_wallet_nfts.py', wallet_address])
    except subprocess.CalledProcessError as e:
        return jsonify({'error': e.output}), 500
    return jsonify({'output': output})
    
@app.route('/test_acquire_wallet_nfts', methods=['POST'])
def test_acquire_wallet_nfts():
    wallet_address = request.form.get('wallet_address')
    if not wallet_address:
        return jsonify({'error': 'wallet_address is required'}), 400
    NFTs = sample_nft_data['NFTs']['collectibleBalances']
    return jsonify(NFTs)
    
if __name__ == '__main__':
    app.run(debug=True, port=8000)
