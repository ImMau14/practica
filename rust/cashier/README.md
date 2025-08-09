# Cashier

Este es un ejercicio de practica que hice para aprender Rust. 

No cumplí con todos los requisitos del ejercicio, pero, siento que he aprendido bastante los fundamentos de Rust en el proceso, ¡qué es lo que quería!.

Seguramente suba más en un futuro.

## Enunciado

Realizar un modelo para un cajero automatico. Se debe escribir un login que soporte validaciones para 3 campos fundamentales:

1. Número de tarjeta: 6200112211002211.
2. Cédula: 22000111.
3. Clave: 159753.
	
Estos datos para validar el acceso deben ser internos, no se pueden cambiar, ni actualizar, son definidos internamente. Al conseguir la validacion exitosa, el modelo debe desplegar 5 opciones.

1. -Consultar.
2. -Depositar.
3. -Retirar.
4. -Cerrar sesion.
5. -Salir.

La moneda utilizada sera $.

1. En consultar, se debe visualziar el monto en cuenta. Debe partir con un monto inicial de 100$.

2. Para depositar se coloca el monto y se suam al monto a la cuenta, ademas debe pedir concepto de deposito.

3. Para retirar, se debe validar si el usuario está intentando debitar más de lo que posee en cuenta, de lo contrario, no debería dejarle debitar. Al debitar se debe cobrar una comision de 2% por cada transaccion, nunca el saldo debe quedar en negativo.

4. Al cerrar sesión, el modelo no debe cerrarse, sino que debe volver al login para que le usuario vuelva a iniciar sesión.

5. En esta opcion si se cierra el modelo. Es la única salida posible.