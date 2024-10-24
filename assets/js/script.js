document.addEventListener('DOMContentLoaded', function () {
    fetch('data/problemas_salud.csv')
        .then(response => response.text())
        .then(data => {
            Papa.parse(data, {
                delimiter: ";",
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    // Encabezados actualizados
                    mostrarFilaCombinada();  // Añadir la fila combinada
                    mostrarEncabezados(['N°', 'Problema de Salud', 'Listado Especifico Prestaciones', 'Flujo SSMO', 'CONFIRMACION', 'NOTIFICACIÓN GES', 'SIC A SIGGES', 'SIC SIDRA', 'Observaciones']);
                    mostrarDatos(results.data);
                }
            });
        });

    // Función para filtrar la tabla según lo que se escribe en el input de búsqueda
    document.getElementById('searchInput').addEventListener('input', function () {
        const searchValue = this.value.toLowerCase();
        const filas = document.querySelectorAll('#tablaDatos tbody tr');

        filas.forEach(fila => {
            const textoFila = fila.textContent.toLowerCase();
            fila.style.display = textoFila.includes(searchValue) ? '' : 'none';
        });
    });
});

function mostrarFilaCombinada() {
    const tablaEncabezado = document.getElementById('tablaDatos').getElementsByTagName('thead')[0];
    const filaCombinada = tablaEncabezado.insertRow(0); // Insertar en la primera posición

    // Crear las primeras celdas vacías que no serán combinadas
    filaCombinada.insertCell().setAttribute('colspan', '3'); // N°, Problema de Salud, Listado Especifico Prestaciones
    filaCombinada.insertCell().setAttribute('colspan', '1'); // Flujo SSMO

    // Crear la celda combinada
    const celdaGestionAPS = filaCombinada.insertCell();
    celdaGestionAPS.setAttribute('colspan', '4'); // Combina CONFIRMACION APS, NOTIFICACIÓN GES APS, SIC A SIGGES, SIC SIDRA
    celdaGestionAPS.textContent = 'Gestión APS';
    celdaGestionAPS.classList.add('center-header'); // Clase CSS para centrado

    // Añadir una celda vacía para "Observaciones"
    filaCombinada.insertCell().setAttribute('colspan', '1'); // Observaciones
}

function mostrarEncabezados(encabezados) {
    const filaEncabezado = document.getElementById('header-row');
    encabezados.forEach(encabezado => {
        const celda = document.createElement('th');
        celda.textContent = encabezado;
        celda.classList.add('center-header'); // Aplica la clase de centrado
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
        celdaProblema.innerHTML = `<a href="${fila['link1']}" class="justify-text">${fila['NOMBRE'].trim()}</a>`;
        celdaProblema.style.fontSize = 'larger';  // Aumentar el tamaño de la letra
      

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
        celdaConf.textContent = fila['CONFIRMACION APS'];
        celdaConf.classList.add('center-text');

        // NOTIFICACIÓN GES APS (Centrado)
        const celdaNotif = nuevaFila.insertCell();
        celdaNotif.textContent = fila['NOTIFICACIÓN GES APS'];
        celdaNotif.classList.add('center-text');

        // SIC A SIGGES [Gestión APS]  (Centrado)
        const celdaSicSigges = nuevaFila.insertCell();
        celdaSicSigges.textContent = fila['SIC A SIGGES'];
        celdaSicSigges.classList.add('center-text');

        // SIC SIDRA (Centrado)
        const celdaSicSidra = nuevaFila.insertCell();
        celdaSicSidra.textContent = fila['SIC SIDRA'];
        celdaSicSidra.classList.add('center-text');

        // Observaciones (Triple espacio)
        const celdaObs = nuevaFila.insertCell();
        celdaObs.textContent = fila['Observaciones'];
        celdaObs.classList.add('th-observaciones');
    });
}
