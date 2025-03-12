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
                    mostrarFilaCombinada();
                    mostrarEncabezados(['N°', 'Problema de Salud', 'Listado Especifico Prestaciones', 'Flujo SSMO', 'Sospecha', 'Confirmación', 'Notificación GES', 'SIC a SIGGES', 'SIC a TrakCare', 'Observaciones']);
                    mostrarDatos(results.data);
                }
            });
        });

    // Función para filtrar la tabla
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
    const filaCombinada = tablaEncabezado.insertRow(0);
    const celdaVacia = filaCombinada.insertCell();
    celdaVacia.setAttribute('colspan', '4');
    celdaVacia.textContent = 'Documentación';

    const celdaGestionAPS = filaCombinada.insertCell();
    celdaGestionAPS.setAttribute('colspan', '5');
    celdaGestionAPS.textContent = 'Gestión APS';
    celdaGestionAPS.classList.add('center-header');

    filaCombinada.insertCell().setAttribute('colspan', '1');
    filaCombinada.classList.add('colspan');
}

function mostrarEncabezados(encabezados) {
    const filaEncabezado = document.getElementById('header-row');
    encabezados.forEach(encabezado => {
        const celda = document.createElement('th');
        celda.textContent = encabezado;
        celda.classList.add('center-header');
        filaEncabezado.appendChild(celda);
    });
}

function mostrarDatos(datos) {
    const cuerpoTabla = document.getElementById('tablaDatos').getElementsByTagName('tbody')[0];
    datos.forEach(fila => {
        const nuevaFila = cuerpoTabla.insertRow();

        const celdaNumero = nuevaFila.insertCell();
        celdaNumero.textContent = fila['Problema de Salud'];

        const celdaProblema = nuevaFila.insertCell();
        celdaProblema.innerHTML = `<a href="${fila['link1']}" class="justify-text">${fila['NOMBRE'].trim()}</a>`;
        celdaProblema.style.fontSize = 'larger';

        const celdaListado = nuevaFila.insertCell();
        celdaListado.innerHTML = `<a href="${fila['link 2']}"><i class="bi bi-arrow-up-right-square-fill big-icon"></i></a>`;
        celdaListado.classList.add('center-text');

        const celdaFlujo = nuevaFila.insertCell();
        celdaFlujo.innerHTML = `<a href="${fila['link 3']}" target="_blank" rel="noopener noreferrer"><i class="bi bi-file-pdf big-icon"></i></a>`;
        celdaFlujo.classList.add('center-text');

        // Celdas con estilo dinámico
        const celdaSosp = nuevaFila.insertCell();
        aplicarEstiloSiNo(celdaSosp, fila['SOSPECHA']);

        const celdaConf = nuevaFila.insertCell();
        aplicarEstiloSiNo(celdaConf, fila['CONFIRMACION']);

        const celdaNotif = nuevaFila.insertCell();
        aplicarEstiloSiNo(celdaNotif, fila['NOTIFICACIÓN GES']);

        const celdaSicSigges = nuevaFila.insertCell();
        aplicarEstiloSiNo(celdaSicSigges, fila['SIC A SIGGES']);

        const celdaSicTrakCare = nuevaFila.insertCell();
        aplicarEstiloSiNo(celdaSicTrakCare, fila['SIC TrakCare']);

        const celdaObs = nuevaFila.insertCell();
        celdaObs.textContent = fila['Observaciones'];
        celdaObs.classList.add('th-observaciones');
    });
}

// Función para aplicar estilo dinámico SI/NO
function aplicarEstiloSiNo(celda, valor) {
    celda.textContent = valor;
    celda.classList.add('center-text');
    if (valor.trim().toUpperCase() === 'SI') {
        celda.classList.add('texto-verde');
    } else if (valor.trim().toUpperCase() === 'NO') {
        celda.classList.add('texto-rojo');
    }
}
