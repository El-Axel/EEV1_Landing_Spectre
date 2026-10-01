const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const puedeAnimar = typeof anime !== "undefined" && !sinMovimiento;

const { animate, stagger } = puedeAnimar ? anime : {};

const botonMenu = document.getElementById("boton-menu");
const menuMovil = document.getElementById("menu-movil");
const iconoMenu = botonMenu.querySelector(".icon");

function cambiarMenu(abrir) {
    menuMovil.hidden = !abrir;
    botonMenu.setAttribute("aria-expanded", abrir);
    iconoMenu.classList.toggle("icon-menu", !abrir);
    iconoMenu.classList.toggle("icon-cross", abrir);

    if (abrir && puedeAnimar) {
        animarPanelMovil();
    }
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

function animarPanelMovil() {
    animate(menuMovil, {
        opacity: [0, 1],
        translateY: [-12, 0],
        duration: 350,
        ease: "outQuad",
    });

    animate(menuMovil.querySelectorAll(".nav-item, .btn-block"), {
        opacity: [0, 1],
        translateX: [-16, 0],
        duration: 400,
        ease: "outQuad",
        delay: stagger(60, { start: 120 }),
    });
}

if (puedeAnimar) {
    animate(".encabezado .barra", {
        opacity: [0, 1],
        translateY: [-24, 0],
        duration: 700,
        ease: "outQuad",
    });

    animate(".encabezado .navbar-brand", {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 700,
        delay: 200,
        ease: "outQuad",
    });

    animate(".encabezado .navbar-center .btn-link", {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 500,
        delay: stagger(80, { start: 400 }),
        ease: "outQuad",
    });

    animate(".encabezado .navbar-section .btn-primary", {
        opacity: [0, 1],
        scale: [0.85, 1],
        duration: 600,
        delay: 900,
        ease: "outBack",
    });
}