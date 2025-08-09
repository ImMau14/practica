document.getElementById('generar-grafico').addEventListener('click', async function() {
    const img_graph = document.getElementById('svg-graph');
    const div_loading = document.getElementById('div-loading');
    let div_plotly = document.getElementsByClassName('plotly')[0];

    // Si el gráfico ya está visible, ocultamos la imagen y mostramos el "cargando"
    if (!img_graph.classList.contains('hidden')) {
        img_graph.classList.add('hidden');
        div_loading.classList.remove('hidden');
    }

    // Si existe un gráfico anterior, lo eliminamos
    if (div_plotly) {
        div_plotly.remove();
    }

    // Volver a mostrar el "cargando" antes de hacer la petición
    div_loading.classList.remove('hidden');

    try {
        const response = await fetch('/get_graph');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const figuraData = await response.json();
        const container = document.getElementById('grafico');

        // Después de recibir la respuesta, se oculta "cargando"
        div_loading.classList.add('hidden');

        // Crear el nuevo gráfico
        Plotly.newPlot(container, figuraData);

    } catch (error) {
        console.error('Error al cargar el gráfico:', error);
        // En caso de error, se muestra un mensaje en el contenedor del gráfico
        document.getElementById('grafico').innerHTML = 
            '<p class="text-red-500 text-center p-4">Error al cargar el gráfico. Recarga la página e intenta de nuevo.</p>';

        // Tambien se oculta el div de carga en caso de error
        div_loading.classList.add('hidden');
    }
});

Plotly.newPlot(container, figuraData, {}, {
    responsive: true,  // Adapta la gráfica al contenedor
    scrollZoom: false,  // Evita zoom no deseado
    displayModeBar: false  // Oculta botones de herramientas
});

// Fuerza el redimensionamiento después de cargar
setTimeout(() => {
    Plotly.Plots.resize(container);
}, 50);

window.onresize = () => {
    Plotly.Plots.resize(container);
};
