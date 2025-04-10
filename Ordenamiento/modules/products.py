import random

class Producto:
    def __init__(self, id, nombre, precio, ventas, calificacion, reputacion_vendedor, disponibilidad, modelo):
        self.id = id
        self.nombre = nombre
        self.precio = precio
        self.ventas = ventas
        self.calificacion = calificacion  # 0-5
        self.reputacion_vendedor = reputacion_vendedor  # 0-10
        self.disponibilidad = disponibilidad  # Booleano
        self.modelo = modelo # Año

# Generación de Datos y Pruebas
def generar_productos(n):
    return [Producto(
        id = i,
        nombre = f"Producto {i}",
        precio = random.randint(100, 10000),
        ventas = random.randint(0, 5000),
        calificacion = round(random.uniform(0, 5), 1),
        reputacion_vendedor = random.randint(0, 10),
        disponibilidad = random.choice([True, False]),
        modelo = random.randint(2000, 2024)
    ) for i in range(n)]

PRODUCTOS = generar_productos(1000)