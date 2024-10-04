document.addEventListener('DOMContentLoaded', function() {
    fetch('problemas_salud.csv')
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            delimiter: ";",
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                // Encabezados actualizados
                mostrarEncabezados(['N°', 'Problema de Salud', 'Listado Especifico Prestaciones', 'Flujo SSMO', 'CONFIRMACION APS (Ingreso Hoja APS) [Gestión APS]', 'NOTIFICACIÓN GES APS [Gestión APS]', 'SIC A SIGGES [Gestión APS]', 'SIC SIDRA [Gestión APS]', 'Observaciones']);
                mostrarDatos(results.data);
            }
        });
    });

    // Función para filtrar la tabla según lo que se escribe en el input de búsqueda
    document.getElementById('searchInput').addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const filas = document.querySelectorAll('#tablaDatos tbody tr');

        filas.forEach(fila => {
            const textoFila = fila.textContent.toLowerCase();
            fila.style.display = textoFila.includes(searchValue) ? '' : 'none';
        });
    });
});

function mostrarEncabezados(encabezados) {
    const filaEncabezado = document.getElementById('header-row');
    encabezados.forEach(encabezado => {
        const celda = document.createElement('th');
        celda.textContent = encabezado;
        filaEncabezado.appendChild(celda);
    });
}

function mostrarDatos(datos) {
    const cuerpoTabla = document.getElementById('tablaDatos').getElementsByTagName('tbody')[0];
    datos.forEach(fila => {
        const nuevaFila = cuerpoTabla.insertRow();

        // N° (antes "Problema de Salud")
        const celdaNumero = nuevaFila.insertCell();
        celdaNumero.textContent = fila['Problema de Salud'];  // Aquí se mantiene el valor de la columna

        // Problema de Salud (antes "NOMBRE")
        const celdaProblema = nuevaFila.insertCell();
        celdaProblema.innerHTML = `<a href="${fila['link1']}">${fila['NOMBRE']}</a>`;  // Ahora mostramos el campo NOMBRE bajo el título Problema de Salud

        // Listado Especifico Prestaciones (Centrado y con ícono grande)
        const celdaListado = nuevaFila.insertCell();
        celdaListado.innerHTML = `<a href="${fila['link 2']}"><i class="bi bi-arrow-up-right-square-fill big-icon"></i></a>`;
        celdaListado.classList.add('center-text');

        // Flujo SSMO (Centrado y con ícono grande)
        const celdaFlujo = nuevaFila.insertCell();
        celdaFlujo.innerHTML = `<a href="${fila['link 3']}"><i class="bi bi-file-pdf big-icon"></i></a>`;
        celdaFlujo.classList.add('center-text');

        // CONFIRMACION APS (Centrado)
        const celdaConf = nuevaFila.insertCell();
        celdaConf.textContent = fila['CONFIRMACION APS (Ingreso Hoja APS) [Gestión APS]'];
        celdaConf.classList.add('center-text');

        // NOTIFICACIÓN GES APS (Centrado)
        const celdaNotif = nuevaFila.insertCell();
        celdaNotif.textContent = fila['NOTIFICACIÓN GES APS [Gestión APS]'];
        celdaNotif.classList.add('center-text');

        // SIC A SIGGES [Gestión APS]  (Centrado)
        const celdaSicSigges = nuevaFila.insertCell();
        celdaSicSigges.textContent = fila['SIC A SIGGES [Gestión APS]'];
        celdaSicSigges.classList.add('center-text');

        // SIC SIDRA (Centrado)
        const celdaSicSidra = nuevaFila.insertCell();
        celdaSicSidra.textContent = fila['SIC SIDRA [Gestión APS]'];
        celdaSicSidra.classList.add('center-text');

        // Observaciones (Triple espacio)
        const celdaObs = nuevaFila.insertCell();
        celdaObs.textContent = fila['Observaciones'];
        celdaObs.classList.add('th-observaciones');
    });
}
