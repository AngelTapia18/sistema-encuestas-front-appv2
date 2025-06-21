const formPregunta = document.getElementById("formAgregarPregunta");
const tablaPreguntas = document.getElementById("tablaPreguntas").querySelector("tbody");
let idPreguntaActual = 3; // Incremental desde el último ID

formPregunta.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombrePregunta").value.trim();
    if (nombre === "") return;

    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
    <td>${idPreguntaActual++}</td>
    <td>${nombre}</td>
    <td>
        <button class="btn btn-sm btn-warning me-2">Editar</button>
        <button class="btn btn-sm btn-danger">Eliminar</button>
    </td>
    `;

    tablaPreguntas.appendChild(nuevaFila);
    formPregunta.reset();

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalAgregarPregunta"));
    modal.hide();
});

// Variables para editar
const modalEditarPregunta = new bootstrap.Modal(document.getElementById("modalEditarPregunta"));
const formEditarPregunta = document.getElementById("formEditarPregunta");
const inputNombreEditarPregunta = document.getElementById("nombreEditarPregunta");
const inputIndexPregunta = document.getElementById("editIndexPregunta");

// Delegación: botón "Editar"
document.getElementById("tablaPreguntas").addEventListener("click", function (e) {
    if (e.target && e.target.matches("button.btn-warning")) {
    const fila = e.target.closest("tr");
    const nombrePregunta = fila.cells[1].textContent;
    const indice = Array.from(fila.parentNode.children).indexOf(fila);

    inputNombreEditarPregunta.value = nombrePregunta;
    inputIndexPregunta.value = indice;

    modalEditarPregunta.show();
    }
});

// Guardar cambios
formEditarPregunta.addEventListener("submit", function (e) {
    e.preventDefault();

    const nuevoNombre = inputNombreEditarPregunta.value.trim();
    const indice = parseInt(inputIndexPregunta.value);

    if (nuevoNombre === "") return;

    const filas = document.querySelectorAll("#tablaPreguntas tbody tr");
    if (filas[indice]) {
    filas[indice].cells[1].textContent = nuevoNombre;
    }

    modalEditarPregunta.hide();
});


// Variables para eliminar
const modalEliminarPregunta = new bootstrap.Modal(document.getElementById("modalConfirmarEliminarPregunta"));
const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminarPregunta");
let filaAEliminar = null;

// Delegación: clic en "Eliminar"
document.getElementById("tablaPreguntas").addEventListener("click", function (e) {
    if (e.target && e.target.matches("button.btn-danger")) {
    filaAEliminar = e.target.closest("tr");
    modalEliminarPregunta.show();
    }
});

// Confirmar eliminación
btnConfirmarEliminar.addEventListener("click", function () {
    if (filaAEliminar) {
    filaAEliminar.remove();
    filaAEliminar = null;
    modalEliminarPregunta.hide();
    }
});

function irAOpciones(idPregunta) {
    window.location.href = `opciones.html?id=${idPregunta}`;
}
