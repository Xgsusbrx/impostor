// 1. Referencias a los elementos del HTML
const menuPrincipal = document.getElementById("menu-principal");
const inputCantidad = document.getElementById("cantidad-jugadores");
const listaNombres = document.getElementById("lista-nombres");
const btnEmpezar = document.getElementById("btn-empezar");

const pantallaJuego = document.getElementById("pantalla-juego");
const carta = document.getElementById("carta-jugador");
const cartaNombre = document.getElementById("carta-nombre");
const palabraSecreta = document.getElementById("palabra-secreta");
const btnSiguiente = document.getElementById("btn-siguiente");
const numeroJugador = document.getElementById("numero-jugador");
const totalJugadores = document.getElementById("total-jugadores");

// Un color distinto por jugador. Si hay más de 15, se vuelve a empezar.
const COLORES_CARTAS = [
  "#e63946", // rojo
  "#f4a261", // naranja
  "#e9c46a", // amarillo
  "#2a9d8f", // verde azulado
  "#4cc9f0", // celeste
  "#4361ee", // azul
  "#7209b7", // violeta
  "#f72585", // rosa
  "#06d6a0", // menta
  "#ff7b00", // naranja fuerte
  "#8338ec", // púrpura
  "#3a86ff", // azul brillante
  "#fb5607", // naranja rojizo
  "#ff006e", // rosa fuerte
  "#8ac926", // lima
];

// Estado del reparto
let jugadores = [];
let indiceActual = 0;

// 2. Dibuja tantos inputs de nombre como jugadores haya
function generarInputsNombres() {
  const cantidad = parseInt(inputCantidad.value);

  // Si el valor no es válido, no hacemos nada
  if (isNaN(cantidad) || cantidad < 1) return;

  // Guardamos lo que ya escribió el usuario para no perderlo al regenerar
  const nombresActuales = [...listaNombres.querySelectorAll("input")].map(
    (input) => input.value
  );

  listaNombres.innerHTML = "";

  for (let i = 0; i < cantidad; i++) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = `Jugador ${i + 1}`;
    input.value = nombresActuales[i] || "";
    input.maxLength = 15;
    listaNombres.appendChild(input);
  }
}

// 3. Lee los nombres (si alguno está vacío, usa "Jugador N")
function obtenerNombres() {
  const inputs = listaNombres.querySelectorAll("input");
  return [...inputs].map((input, i) => input.value.trim() || `Jugador ${i + 1}`);
}

// 4. Arranca el reparto de cartas
function iniciarReparto(nombres) {
  jugadores = nombres;
  indiceActual = 0;

  menuPrincipal.hidden = true;
  pantallaJuego.hidden = false;

  mostrarJugador();
}

// 5. Prepara la carta del jugador actual
function mostrarJugador() {
  const nombre = jugadores[indiceActual];
  const color = COLORES_CARTAS[indiceActual % COLORES_CARTAS.length];

  // Volvemos la carta a su cara frontal sin que se vea la animación
  reiniciarCarta();

  cartaNombre.textContent = nombre;
  carta.style.setProperty("--color-carta", color);
  carta.style.setProperty("--color-texto-carta", colorTextoPara(color));
  carta.setAttribute("aria-label", `Carta de ${nombre}. Tocá para ver tu palabra`);

  // La palabra queda en blanco por ahora
  palabraSecreta.textContent = "";

  numeroJugador.textContent = indiceActual + 1;
  totalJugadores.textContent = jugadores.length;

  // El botón de avanzar solo aparece después de voltear la carta
  btnSiguiente.hidden = true;
  btnSiguiente.textContent =
    indiceActual === jugadores.length - 1 ? "Finalizar" : "Siguiente jugador";
}

// 6. Vuelve la carta a la cara frontal sin animación
function reiniciarCarta() {
  carta.classList.add("sin-transicion");
  carta.classList.remove("volteada");
  void carta.offsetWidth; // fuerza al navegador a aplicar el cambio
  carta.classList.remove("sin-transicion");
}

// 7. Voltea la carta y muestra el botón para seguir
function voltearCarta() {
  // Solo se puede voltear una vez por jugador
  if (carta.classList.contains("volteada")) return;

  carta.classList.add("volteada");
  carta.setAttribute("aria-label", `Palabra de ${jugadores[indiceActual]} revelada`);
  btnSiguiente.hidden = false;
}

// 8. Pasa al siguiente jugador (o vuelve al menú si era el último)
function siguienteJugador() {
  if (indiceActual < jugadores.length - 1) {
    indiceActual++;
    mostrarJugador();
  } else {
    volverAlMenu();
  }
}

function volverAlMenu() {
  pantallaJuego.hidden = true;
  menuPrincipal.hidden = false;
}

// 9. Elige texto claro u oscuro según qué tan brillante sea el color de la carta
function colorTextoPara(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const luminancia = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminancia > 0.6 ? "#151022" : "#ffffff";
}

// 10. Eventos
inputCantidad.addEventListener("input", generarInputsNombres);

btnEmpezar.addEventListener("click", () => {
  iniciarReparto(obtenerNombres());
});

carta.addEventListener("click", voltearCarta);

btnSiguiente.addEventListener("click", siguienteJugador);

// 11. Generamos los inputs iniciales al cargar la página
generarInputsNombres();
