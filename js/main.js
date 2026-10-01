// ---------- MENÚ MÓVIL ----------
const botonMenu = document.getElementById("boton-menu");
const menuMovil = document.getElementById("menu-movil");
const iconoMenu = botonMenu.querySelector(".icon");

function cambiarMenu(abrir) {
    menuMovil.hidden = !abrir;
    botonMenu.setAttribute("aria-expanded", abrir);
    iconoMenu.classList.toggle("icon-menu", !abrir);
    iconoMenu.classList.toggle("icon-cross", abrir);
}

botonMenu.addEventListener("click", function () {
    cambiarMenu(menuMovil.hidden);
});

menuMovil.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        cambiarMenu(false);
    });
});

const formulario = document.getElementById("formulario-reserva");
const campoLlegada = document.getElementById("llegada");
const campoSalida = document.getElementById("salida");
const grupoSalida = campoSalida.closest(".form-group");
const errorFechas = document.getElementById("error-fechas");
const avisoExito = document.getElementById("aviso-exito");
const botonCerrarAviso = document.getElementById("cerrar-aviso");

function fechaLocal(fecha) {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return anio + "-" + mes + "-" + dia;
}

const hoy = fechaLocal(new Date());
campoLlegada.min = hoy;
campoSalida.min = hoy;

function mostrarErrorFechas(mostrar) {
    grupoSalida.classList.toggle("has-error", mostrar);
    errorFechas.hidden = !mostrar;
    campoSalida.setAttribute("aria-invalid", mostrar);
}

campoLlegada.addEventListener("change", function () {
    if (campoLlegada.value) {
        campoSalida.min = campoLlegada.value;
    }
    mostrarErrorFechas(false);
});

campoSalida.addEventListener("change", function () {
    mostrarErrorFechas(false);
});

// Al enviar
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    if (campoSalida.value <= campoLlegada.value) {
        avisoExito.hidden = true;
        mostrarErrorFechas(true);
        campoSalida.focus();
        return;
    }

    avisoExito.hidden = false;
    formulario.reset();
    campoSalida.min = hoy;
});

botonCerrarAviso.addEventListener("click", function () {
    avisoExito.hidden = true;
});