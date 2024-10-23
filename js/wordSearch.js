// Lista de palabras al azar en español
const palabras = ["gato", "perro", "casa", "coche", "árbol", 
    "montaña", "sol", "luna", "estrella", "mar", "ventana", "libro", 
    "libreria", "universidad","escuela","colegio","comida",
    "cangrejo", "jirafa"];

// Función para generar palabras aleatorias
function generarPalabrasAleatorias(cantidad) {
    let palabrasSeleccionadas = [];
    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * palabras.length);
        palabrasSeleccionadas.push(palabras[indiceAleatorio]);
    }
    return palabrasSeleccionadas;
}

// Mostrar palabras al azar en la pantalla
const palabrasAleatorias = generarPalabrasAleatorias(5);
document.getElementById('random-words').innerHTML = palabrasAleatorias.join(', ');

// Verificar si las palabras ingresadas coinciden
document.getElementById('check-btn').addEventListener('click', function() {
    const inputUsuario = document.getElementById('user-input').value.trim().toLowerCase();
    const palabrasUsuario = inputUsuario.split(/[\s,]+/); // Separar por espacios o comas
    const resultado = verificarPalabras(palabrasUsuario, palabrasAleatorias);

    if (resultado) {
        document.getElementById('result').innerHTML = "<p style='color:green;'>¡Correcto! Todas las palabras son correctas.</p>";
    } else {
        document.getElementById('result').innerHTML = "<p style='color:red;'>Algunas palabras son incorrectas. Inténtalo de nuevo.</p>";
    }
});

// Función para verificar si las palabras coinciden
function verificarPalabras(palabrasUsuario, palabrasCorrectas) {
    if (palabrasUsuario.length !== palabrasCorrectas.length) {
        return false;
    }

    for (let i = 0; i < palabrasCorrectas.length; i++) {
        if (palabrasUsuario[i] !== palabrasCorrectas[i]) {
            return false;
        }
    }
    return true;
}
