# DirViewer

[English language](./README-ENG.md)

Una pequeña aplicación en Python para ver la dirección y archivos del directorio de ejecución.

Es un ejercicio de practica de mi clase, que dice:

> La asignación consiste en crear una aplicación de tipo CLI que a partir de utilizar constantes y macros te permita leer el directorio actual en donde se esté ejecutando el proyecto y liste los archivos que se encuentran presentes en él, además de detectar si se está ejecutando en Colab o no.

## Interfaz

Usa una interfaz CLI en donde muestra lo siguiente:
```shell
1. Mostrar directorio actual
0. Salir

        Opción:
```

Si selecciona la opción 1, mostrará la dirección y archivos con este formato:
```shell
Directorio actual: C:\Tu Directorio\DirViewer

    archivo texto (1).txt         archivo texto (10).txt        archivo texto (11).txt
    archivo texto (2).txt         archivo texto (3).txt         archivo texto (4).txt
    archivo texto (5).txt         archivo texto (6).txt         archivo texto (7).txt
    archivo texto (8).txt         archivo texto (9).txt             fileviewer.py

Presione enter para continuar...
```

Y si selecciona la opción 0, el programa culminará.

## Funcionamiento

Funciona con la librería estandar de Python `OS`, donde se usan diferentes funciones cómo `listdir` para enlistar los archivos, `getcwd` para obtener el directorio de ejecución, `system` para limpiar la pantalla y la constante `name` para determinar el tipo de sistema.

### Explicación del Código

Esto es para importar las funciones y variables que se van a usar en el programa.
```python
from os import listdir, getcwd, system, name
```
#### Macros y Constantes

Dos de los requisitos del ejercicio es que el programa use macros y constantes. Dado que en Python no existen de igual manera que en otros lenguajes cómo C/C++, se usan simulaciones.

Aquí se realiza el proceso de verificación para determinar desde dónde se está ejecutando el código (ya sea desde **Google Colab** o de forma local en el sistema). Dado que la librería `google.colab` solo está disponible en Colab -valga la redundancia— si su importación falla, significa que el código se está ejecutando de forma local. Se define una constante que indica si **ES_COLAB** (`IS_COLAB`) o no.

La función lambda `CLEAR()` usa `system()` junto a una condicional ternaria, la cual verifica si el sistema es Windows (nt) o Linux/MacOs (posix), para determinar el comando para limpiar la pantalla sea correcto.
```python
# Constantes (en realidad es una simulación de constantes)
COLUMN = 3
COLUMNS_WIDTH = 30

try:
	import google.colab
	IS_COLAB = True

except:
	IS_COLAB = False

# Macro (en realidad es una simulación de macro)
CLEAR = lambda : system("cls" if name == 'nt' else "clear")
```

Son valores que puede ser cambiados en el futuro, y por eso simulan constantes, y una función lambda es lo más cercano a una macro, simulando una.

#### Función pressEnterToContinue

Es una función con proposito a detener el flujo hasta que se presione la tecla `Enter`, para luego limpiar la pantalla. Es más que nada para fines estéticos de la interfaz.

Primero usa la función `input()`, que esperará hasta que el usuario presione la tecla `Enter`, y la *macro* anteriormente creada `CLEAR` para limpiar la pantalla:
```python
# Función que espera a que el usuario presione enter
def pressEnterToContinue():
	input("\nPresione enter para continuar...\n")
	CLEAR()
```

#### Función formatCenter

Esta función es para mostrar de forma ordenada a la lista de archivos.

Usa un bucle para iterar entre los nombres de los archivos ingresados mediante una lista y los enumera (gracias a la funcion `enumerate()`) con un indice llamado `index`, para poder hacer un salto de linea cada que haya un numero de columnas (usa la constante de columnas `COLUMNS`) y cuándo sea el final de la lista.
```python
# Función que muestra la lista en formato
def formatCenter(filesList):
    # Muestra los archivos en columnas centradas
    for index, file in enumerate(filesList, 1):
        print(format(file, f"^{COLUMNS_WIDTH}"), end = "")
        print() if index % COLUMNS == 0 or index == len(filesList) else None
```

#### Función showDir

Esta función muestra la dirección actual donde se ejecuta el código, y llama la funcion `formatCenter` para mostrar su contenido.

Primero limpia la pantalla, y mediante una condicional, muestra un mensaje en pantalla si es Colab, seguidamente de la dirección de ejecución. Intenta mostrar la lista de archivos con `formatCenter()` y la función `listDir()`cómo parámetro, y si falla por permisos, lo notifica. Finaliza llamando la función `pressEnterToContinue()`

```python
# Función que muestra los archivos.
def showDir():
	CLEAR()
	if IS_COLAB:
		print("\nEjecutando desde Colab")
	print(f"Directorio actual: {getcwd()}", end = "\n\n")

	try:
		formatCenter(listdir())

	except PermissionError:
		print("Error de permisos al mostrar archivos")

	pressEnterToContinue()
```

#### Función menu

Es la función del menú. Tiene varias salidas, la cual definirá si el bucle principal se detiene o no.

Primero muestra las opciones, luego intenta obtener la respuesta del usuario, y si se ingresa un valor que no es un numero, dará una notificación y llamará a `pressEnterToContinue()`, retornando 1. En caso de no tener problemas, se usará la condicional match para ejecutar la acción. 

En caso de que se haya seleccionado un número fuera del menú, se le notificará.

Si selecciona 1, llamará a la función `showDir()` y retornará 1, pero si elije 0, retornará 0 y mediante el bucle principal se detendrá el programa.
```python
# Función del menú, la cual retorna un valor.
def menu():
	print("1. Mostrar directorio actual", "0. Salir\n", sep = "\n")

	try:
		opcion = int(input("\tOpción: "))

	except ValueError:
		print("\nIngresa un número valido")
		pressEnterToContinue()
		return 1

	match opcion:
		case 1:
			showDir()
			return 1 # Continua el bucle principal

		case 0:
			return 0 # Se detiene el bucle principal

		case _:
			print("\nError: Opción no válida")
			pressEnterToContinue()
			return 1 # Continua el bucle principal
```
#### Bucle principal
Este es el bucle principal, de donde se llamará a función menu mediante el bucle.
```python
if __name__ == "__main__":
	# Bucle del menu
	while True:
		if not menu():
			break
```

