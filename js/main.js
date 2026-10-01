// ---------- MENÚ MÓVIL ----------
const botonMenu = document.getElementById("boton-menu");
const menuMovil = document.getElementById("menu-movil");
const iconoMenu = botonMenu.querySelector(".icon");

// Abre o cierra el panel. "abrir" es true (abrir) o false (cerrar).
function cambiarMenu(abrir) {
    menuMovil.hidden = !abrir;                              // muestra u oculta el panel
    botonMenu.setAttribute("aria-expanded", abrir);         // avisa a lectores de pantalla
    iconoMenu.classList.toggle("icon-menu", !abrir);        // hamburguesa cuando está cerrado
    iconoMenu.classList.toggle("icon-cross", abrir);        // X cuando está abierto
}

// Al tocar el botón: si el panel estaba oculto lo abre, y si no, lo cierra
botonMenu.addEventListener("click", function () {
    cambiarMenu(menuMovil.hidden);
});

// Al tocar un enlace del panel, se cierra solo
menuMovil.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        cambiarMenu(false);
    });
});