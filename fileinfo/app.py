from flask import Flask, render_template, Response

app = Flask(__name__)

@app.route('/')
def pagina_principal():
	return render_template('index.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5000, debug=True)
