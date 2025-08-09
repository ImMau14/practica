from flask import Flask, render_template, Response, jsonify, request
from routes.upload import bp as upload_bp
from utils.language import getLang
import os
import json

app = Flask(__name__)

# Route o API importada a app.py
app.register_blueprint(upload_bp, url_prefix='/api')

@app.route('/')
def pagina_principal():
	lang = getLang("langs/indexlang.json")
	return render_template(
		'index.html',
		form=lang["form"],
		upload=lang["upload"],
		start=lang["start"],
		cancel=lang["cancel"],
		details=lang["details"],
		initStatus=lang["initStatus"]
	)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)