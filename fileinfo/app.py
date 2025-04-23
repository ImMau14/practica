from flask import Flask, render_template, Response, jsonify
from routes.upload import bp as upload_bp
import os

app = Flask(__name__)

# Route o API importada a app.py
app.register_blueprint(upload_bp, url_prefix='/api')

@app.route('/')
def pagina_principal():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)