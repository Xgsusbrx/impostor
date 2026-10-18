// 1. Referencias a los elementos del HTML
const inputCantidad = document.getElementById("cantidad-jugadores");
const listaNombres = document.getElementById("lista-nombres");
const btnEmpezar = document.getElementById("btn-empezar");

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

// 4. Eventos
inputCantidad.addEventListener("input", generarInputsNombres);

btnEmpezar.addEventListener("click", () => {
  const jugadores = obtenerNombres();
  console.log(jugadores); // por ahora solo lo mostramos en consola
  // Acá después iría: elegir impostor, elegir palabra, cambiar de pantalla...
});

// 5. Generamos los inputs iniciales al cargar la página
generarInputsNombres();