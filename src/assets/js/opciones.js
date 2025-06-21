//////////// Script para opciones

const tablaOpciones = document.querySelector("#tablaOpciones tbody");
let idOpcionActual = 2;
let filaEditar = null;
let filaEliminar = null;

// Añadir opción
document.getElementById("formAgregarOpcion").addEventListener("submit", function(e) {
    e.preventDefault();
    const texto = document.getElementById("nombreOpcion").value.trim();
    if (texto === "") return;

    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
    <td>${idOpcionActual++}</td>
    <td>${texto}</td>
    <td>
        <button class="btn btn-sm btn-warning me-2">Editar</button>
        <button class="btn btn-sm btn-danger">Eliminar</button>
    </td>
    `;
    tablaOpciones.appendChild(nuevaFila);
    this.reset();
    bootstrap.Modal.getInstance(document.getElementById("modalAgregarOpcion")).hide();
});

// Delegación para Editar y Eliminar
tablaOpciones.addEventListener("click", function(e) {
    const fila = e.target.closest("tr");
    if (e.target.classList.contains("btn-warning")) {
    // Editar
    filaEditar = fila;
    document.getElementById("indiceEditarOpcion").value = fila.rowIndex - 1;
    document.getElementById("textoEditarOpcion").value = fila.cells[1].textContent;
    new bootstrap.Modal(document.getElementById("modalEditarOpcion")).show();
    }
    if (e.target.classList.contains("btn-danger")) {
    // Eliminar
    filaEliminar = fila;
    new bootstrap.Modal(document.getElementById("modalEliminarOpcion")).show();
    }
});

// Guardar edición
document.getElementById("formEditarOpcion").addEventListener("submit", function(e) {
    e.preventDefault();
    const nuevoTexto = document.getElementById("textoEditarOpcion").value.trim();
    if (filaEditar && nuevoTexto !== "") {
    filaEditar.cells[1].textContent = nuevoTexto;
    filaEditar = null;
    bootstrap.Modal.getInstance(document.getElementById("modalEditarOpcion")).hide();
    }
});

// Confirmar eliminación
document.getElementById("btnConfirmarEliminarOpcion").addEventListener("click", function() {
    if (filaEliminar) {
    filaEliminar.remove();
    filaEliminar = null;
    bootstrap.Modal.getInstance(document.getElementById("modalEliminarOpcion")).hide();
    }
});
