# DirViewer

[Idioma español](./README.md)

A small Python application to view the address and files in the running directory.

This is a practice exercise from my class, which states:

> The assignment consists of creating a CLI-style application that, using constants and macros, allows you to read the current directory where the project is running and list the files present there.

## Interface

Uses a CLI interface where it displays the following:
```shell
1. Show current directory
0. Exit

        Option:
```

If you select option 1, it will display the address and files in this format:
```shell
Current directory: C:\Your Directory\DirViewer

    archivo texto (1).txt         archivo texto (10).txt        archivo texto (11).txt
    archivo texto (2).txt         archivo texto (3).txt         archivo texto (4).txt
    archivo texto (5).txt         archivo texto (6).txt         archivo texto (7).txt
    archivo texto (8).txt         archivo texto (9).txt             fileviewer.py

Press enter to continue...
```

And if you select option 0, the program will exit.

## How It Works

It works with the standard Python `OS` library, where different functions are used, such as `listdir` to list files, `getcwd` to obtain the execution directory, `system` to clear the screen, and the `name` constant to determine the system type.

### Code Explanation

This is to import the functions and variables that will be used in the program.
```python
from os import listdir, getcwd, system, name
```
#### Macros and Constants

Two of the exercise's requirements are that the program uses macros and constants. Since they don't exist in Python in the same way as in other languages ​​like C/C++, simulations are used.

This process verifies where the code is being executed (whether from **Google Colab** or locally on the system). Since the `google.colab` library is only available in Colab —redundant as it may seem— if its import fails, it means the code is being executed locally. A constant is defined to indicate whether **IS_COLAB** or not.

The lambda function `CLEAR()` uses `system()` along with a ternary conditional, which checks whether the system is Windows (NT) or Linux/MacOS (POSIX), to determine the correct command to clear the screen.

```python
# Constants (actually a simulation of constants)
COLUMN = 3
COLUMNS_WIDTH = 30

try:
	import google.colab
	IS_COLAB = True

except:
	IS_COLAB = False

# Macro (actually a simulation of a macro)
CLEAR = lambda : system("cls" if name == 'nt' else "clear")
```

These are values ​​that can be changed in the future, and that's why they simulate constants. A lambda function is the closest thing to a macro, simulating one.

#### pressEnterToContinue Function

This function is intended to pause the flow until the `Enter` key is pressed, and then clear the screen. It's mostly for aesthetic purposes.

First, use the `input()` function, which will wait until the user presses the `Enter` key, and the previously created `CLEAR` macro to clear the screen:
```python
# Function that waits for the user to press enter
def pressEnterToContinue():
	input("\nPress enter to continue...")
	CLEAR()
```

#### formatCenter Function

This function displays the list of files in an orderly manner.

It uses a loop to iterate through the file names entered in a list and enumerates them (using the `enumerate()` function) with an index called `index`, so that a line break can be made every time there is a certain number of columns (uses the `COLUMNS` column constant) and when the list is over.

```python
# Function that displays the list in format
def formatCenter(filesList):
	# Displays the files in centered columns
	for index, file in enumerate(filesList, 1):
		print(format(file, f"^{COLUMNS_WIDTH}"), end = "")
		print() if index % COLUMNS == 0 or index == len(filesList) else None
```

#### showDir Function

This function displays the current address where the code is being executed and calls the `formatCenter` function to display its contents.

First, clear the screen, and then, using a conditional, display a message on the screen if the code is being executed in Colab, followed by the execution address. It attempts to display the file list with `formatCenter()` and the `listDir()` function as parameters, and if it fails due to permissions, it notifies you. It ends by calling the `pressEnterToContinue()` function.

```python
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
```

#### menu Function

This is the menu function. It has several outputs, which will determine whether the main loop stops or not.

It first displays the options, then attempts to obtain the user's response. If a value other than a number is entered, it will issue a notification and call `pressEnterToContinue()`, returning 1. If there are no problems, the match conditional will be used to execute the action.

If a number outside the menu was selected, you will be notified.

If you select 1, it will call the `showDir()` function and return 1, but if you select 0, it will return 0, and the main loop will stop the program.
```python
# Menu function, which returns a value.
def menu():
	print("1. Show current directory", "0. Exit", sep = "")

	try:
	

	except ValueError:
		print("Enter a valid number")
		pressEnterToContinue()
		return 1

	match option:
		case 1:
			showDir()
			return 1 # The mainloop continues

		case 0:
			return 0 # The mainloop stops

		case _:
			print("Error: Invalid option")
			pressEnterToContinue()
			return 1 # The mainloop continues
```
#### Main Loop
This is the main loop, from which the menu function will be called by the loop.
```python
if __name__ == "__main__":
	# Menu Loop
	while True:
		if not menu():
		break
``` 
