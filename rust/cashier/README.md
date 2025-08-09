# Cashier

Este es un ejercicio de práctica que hice para aprender Rust.

No cumplí con todos los requisitos del ejercicio, pero siento que he aprendido bastante sobre los fundamentos de Rust en el proceso, ¡que es lo que quería!

Seguramente suba más en el futuro.

## Enunciado

Realizar un modelo para un cajero automático. Se debe escribir un login que soporte validaciones para 3 campos fundamentales:

1.  Número de tarjeta: 6200112211002211.
2.  Cédula: 22000111.
3.  Clave: 159753.

Estos datos para validar el acceso deben ser internos, no se pueden cambiar ni actualizar. Son definidos internamente. Al conseguir la validación exitosa, el modelo debe desplegar 5 opciones:

1.  Consultar.
2.  Depositar.
3.  Retirar.
4.  Cerrar sesión.
5.  Salir.

La moneda utilizada será $.

1.  En consultar, se debe visualizar el monto en cuenta. Debe partir con un monto inicial de $100.

2.  Para depositar, se coloca el monto y se suma a la cuenta. Además, debe pedir el concepto del depósito.

3.  Para retirar, se debe validar si el usuario está intentando debitar más de lo que posee en cuenta; de lo contrario, no debería permitírsele el débito. Al debitar, se debe cobrar una comisión del 2% por cada transacción. El saldo nunca debe quedar en negativo.

4.  Al cerrar sesión, el modelo no debe cerrarse, sino que debe volver al login para que el usuario vuelva a iniciar sesión.

5.  En esta opción sí se cierra el modelo. Es la única salida posible.