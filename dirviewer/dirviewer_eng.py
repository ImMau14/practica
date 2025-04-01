from os import listdir, getcwd, system, name

# Constants (actually a simulation of constants)
COLUMNS = 3
COLUMNS_WIDTH = 30

try:
	import google.colab
	IS_COLAB = True

except:
	IS_COLAB = False

# Macro (actually a simulation of a macro)
CLEAR = lambda : system("cls" if name == 'nt' else "clear")

# Function that waits for the user to press enter
def pressEnterToContinue():
	input("\nPress enter to continue...\n")
	CLEAR()

# Function that displays the list in format
def formatCenter(filesList):
	# Displays the files in centered columns
	for index, file in enumerate(filesList, 1):
		print(format(file, f"^{COLUMNS_WIDTH}"), end = "")
		print() if index % COLUMNS == 0 or index == len(filesList) else None

# Function that displays the files.
def showDir():
	CLEAR()
	if IS_COLAB:
		print("\nExecuting from Colab")
	print(f"Current directory: {getcwd()}", end = "\n\n")

	try:
		formatCenter(listdir())

	except PermissionError:
		print("Permission error displaying files")

	pressEnterToContinue()

# Menu function, which returns a value.
def menu():
	print("1. Show current directory", "0. Exit\n", sep = "\n")

	try:
		opcion = int(input("\tOption: "))

	except ValueError:
		print("Enter a valid number")
		pressEnterToContinue()
		return 1

	match opcion:
		case 1:
			showDir()
			return 1 # The mainloop continues

		case 0:
			return 0 # The mainloop stops

		case _:
			print("Error: Invalid option")
			pressEnterToContinue()
			return 1 # The mainloop continues

if __name__ == "__main__":
	# Menu Loop
	while True:
		if not menu():
			break