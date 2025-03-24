from os import listdir, getcwd, system, name

# Constantes (en realidad es una simulación de constantes)
COLUMNS = 3
COLUMNS_WIDTH = 30

# Macro (en realidad es una simulación de macro)
CLEAR = lambda : system("cls" if name == 'nt' else "clear")

# Función que espera a que el usuario presione enter
def pressEnterToContinue():
	input("\nPresione enter para continuar...")
	CLEAR()

# Función que muestra la lista en formato
def formatCenter(filesList):
    # Muestra los archivos en columnas centradas
    for index, file in enumerate(filesList, 1):
        print(format(file, f"^{COLUMNS_WIDTH}"), end = "")
        print() if index % COLUMNS == 0 or index == len(filesList) else None

# Función que muestra los archivos.
def showDir():
	CLEAR()
	print(f"Directorio actual: {getcwd()}", end = "\n\n")

	try:
		formatCenter(listdir())

	except PermissionError:
		print("Error de permisos al mostrar archivos")

	pressEnterToContinue()

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
			return 1

		case 0:
			return 0

		case _:
			print("\nError: Opción no válida")
			pressEnterToContinue()
			return 1

if __name__ == "__main__":
	# Bucle del menu
	while True:
		if not menu():
			break