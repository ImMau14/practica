from flask import Flask, render_template, Response
import time
import modules.products as products
import modules.sort as sort
import plotly.graph_objects as go
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def pagina_principal():
	return render_template('index.html')

@app.route('/get_graph')
def obtener_grafico():
	# Medición de tiempos
	tiempos = []
	
	# QuickSort Ventas
	inicio = time.time()
	sort.ordenar_por_ventas(products.PRODUCTOS.copy())
	tiempos.append(time.time() - inicio)
	
	# MergeSort Calificación
	inicio = time.time()
	sort.ordenar_por_calificacion(products.PRODUCTOS.copy())
	tiempos.append(time.time() - inicio)
	
	# BubbleSort Precio
	inicio = time.time()
	sort.ordenar_precio_burbuja(products.PRODUCTOS.copy())
	tiempos.append(time.time() - inicio)
	
	# QuickSort Precio
	inicio = time.time()
	sort.ordenar_precio_quick(products.PRODUCTOS.copy())
	tiempos.append(time.time() - inicio)
	
	# Crear gráfica
	algoritmos = ["QuickSort Ventas", "MergeSort Calificación", "BubbleSort Precio", "QuickSort Precio"]
	colores = ["#4CAF50", "#2196F3", "#fe8b5a", "#9C27B0"]
	
	figura = go.Figure(
		data=[go.Bar(
			x=algoritmos,
			y=tiempos,
			marker_color=colores,
			text=[f"{t:.4f} s" for t in tiempos],
			textposition='auto'
		)]
	)

	figura.update_layout(
		title='Comparación de Rendimiento de Algoritmos',
		yaxis_title='Tiempo (segundos)',
		yaxis_type='log',
		template='plotly_white',
		margin=dict(l=60, r=50, t=100, b=50),
		autosize=False,
		width=960, 
		height=300          
	)

	return Response(
		response=figura.to_json(),
		status=200,
		mimetype='application/json'
	)

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5000, debug=True)