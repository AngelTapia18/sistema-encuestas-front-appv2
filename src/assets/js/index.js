const form = document.getElementById("formAgregarEncuesta");
const tabla = document.getElementById("tablaEncuestas").querySelector("tbody");
let idActual = 3; // ID incrementado desde el último existente

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreEncuesta").value.trim();
    if (nombre === "") return;

    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
    <td>${idActual++}</td>
    <td>${nombre}</td>
    <td>
        <button class="btn btn-sm btn-warning me-2">Editar</button>
        <button class="btn btn-sm btn-danger">Eliminar</button>
    </td>
    `;

    tabla.appendChild(nuevaFila);
    form.reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById("modalAgregarEncuesta"));
    modal.hide();
});

// Obtener modal y formulario de editar
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarEncuesta'));
const formEditar = document.getElementById('formEditarEncuesta');
const inputNombreEditar = document.getElementById('nombreEditarEncuesta');
const inputRowIndex = document.getElementById('editRowIndex');

// Delegación para manejar click en botones "Editar"
document.getElementById('tablaEncuestas').addEventListener('click', function(e) {
    if(e.target && e.target.matches('button.btn-warning')) {
    // Obtener la fila padre del botón
    const fila = e.target.closest('tr');
    const nombre = fila.cells[1].textContent;
    const indice = Array.from(fila.parentNode.children).indexOf(fila);

    // Rellenar modal con datos actuales
    inputNombreEditar.value = nombre;
    inputRowIndex.value = indice;

    // Mostrar modal
    modalEditar.show();
    }
});

const modalEliminar = new bootstrap.Modal(document.getElementById('modalConfirmarEliminar'));
const btnConfirmarEliminar = document.getElementById("btnConfirmarEliminarEncuesta");
let filaAEliminar = null;

// Delegación: clic en "Eliminar"
document.getElementById("tablaEncuestas").addEventListener("click", function (e) {
    if (e.target && e.target.matches("button.btn-danger")) {
    filaAEliminar = e.target.closest("tr");
    modalEliminar.show();
    }
});

// Confirmar eliminación
document.getElementById("btnConfirmarEliminarEncuesta").addEventListener("click", function() {
    if (filaAEliminar) {
    filaAEliminar.remove();
    filaAEliminar = null;
    bootstrap.Modal.getInstance(document.getElementById("modalConfirmarEliminar")).hide();
    }
});

document.getElementById('tablaEncuestas').addEventListener('click', function(e) {
    if(e.target && e.target.matches('button.btn-danger')) {
    modalEliminar.show();
    }
});


// Manejar submit del formulario de edición
formEditar.addEventListener('submit', function(e) {
    e.preventDefault();

    const nuevoNombre = inputNombreEditar.value.trim();
    if(nuevoNombre === '') return;

    const indice = parseInt(inputRowIndex.value);
    const filas = document.querySelectorAll('#tablaEncuestas tbody tr');
    if(filas[indice]) {
    filas[indice].cells[1].textContent = nuevoNombre;
    }

    modalEditar.hide();
});

function irAPreguntas(idEncuesta) {
    // Podrías enviar el id para cargar las preguntas de esa encuesta
    window.location.href = `preguntas.html?id=${idEncuesta}`;
}






