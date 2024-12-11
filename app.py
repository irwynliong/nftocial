from flask import Flask, request, jsonify
import subprocess
from stickermaker import StickerMaker
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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
    

if __name__ == '__main__':
    app.run(debug=True, port=8000)
