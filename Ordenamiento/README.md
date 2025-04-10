# Algoritmos de Ordenamiento

Una pequeña aplicación web con **Flask** para poner a prueba a los algoritmos de ordenamiento, con temática de Carfix Project.

Está hecha pensando en computadoras, y por eso no tiene un diseño responsive que se adapte a las pantallas verticales de los móviles.

![image.png](https://images.hive.blog/DQmYaqPE1vWwnZo1wKzp547aLRANkQhc8tyfJkUBWE2DMoe/image.png)

## Conclusiones
Este pequeño ejercicio demostró la eficiencia que tiene cada algoritmo de ordenamiento, mostrando que el más rápido para este caso sería **Quick Sort**.

**Podio de rapidez**
1. **Quick Sort**.
2. **Merge Sort**.
3. **Bubble Sort**.

## Funcionamiento

### Backend
Usa un servidor local creado con **Flask** y una API que devuelve una gráfica **Plotly**. Tiene dos módulos llamados `sort` y `productos` que implementan la lógica y funcionamiento por parte del servidor.

Los algoritmos de ordenamiento que están en `sort` son: **Quick Sort**, **Merge Sort** y **Bubble Sort**.

### Frontend
Usa una estructura **HTML** con los estilos del framework de **CSS** **TailwindCSS**, además de un archivo `styles.css` para animar la rueda de carga.

Usa **JavaScript** para manipular el DOM y la función `fetch()` para contactar con la API y así obtener la gráfica, generándola gracias al código de **JavaScript** importado de **Plotly**.
