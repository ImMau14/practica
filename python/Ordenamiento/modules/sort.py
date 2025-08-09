# Quick sort
def ordenar_por_ventas(productos):
    if len(productos) <= 1:
        return productos
    pivote = productos[len(productos) // 2].ventas
    menores = [p for p in productos if p.ventas > pivote]
    medios = [p for p in productos if p.ventas == pivote]
    mayores = [p for p in productos if p.ventas < pivote]
    return ordenar_por_ventas(menores) + medios + ordenar_por_ventas(mayores)

# Merge sort.
def ordenar_por_calificacion(productos):
    if len(productos) > 1:
        medio = len(productos) // 2
        izq = ordenar_por_calificacion(productos[:medio])
        der = ordenar_por_calificacion(productos[medio:])
        return mezclar(izq, der)
    return productos

def mezclar(izq, der):
    mezclado = []
    i = j = 0
    while i < len(izq) and j < len(der):
        if izq[i].calificacion >= der[j].calificacion:
            mezclado.append(izq[i])
            i += 1
        else:
            mezclado.append(der[j])
            j += 1
    mezclado.extend(izq[i:])
    mezclado.extend(der[j:])
    return mezclado

# Bubble sort
def ordenar_precio_burbuja(productos):
    n = len(productos)
    for i in range(n):
        for j in range(0, n - i - 1):
            if productos[j].precio > productos[j + 1].precio:
                productos[j], productos[j + 1] = productos[j + 1], productos[j]
    return productos

# Quick sort
def ordenar_precio_quick(productos):
    if len(productos) <= 1:
        return productos
    pivote = productos[len(productos) // 2].precio
    menores = [p for p in productos if p.precio < pivote]
    medios = [p for p in productos if p.precio == pivote]
    mayores = [p for p in productos if p.precio > pivote]
    return ordenar_precio_quick(menores) + medios + ordenar_precio_quick(mayores)