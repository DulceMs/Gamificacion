const palabras = [
    "gato", "perro", "casa", "coche", "árbol", "montaña", 
    "sol", "luna", "estrella", "mar", "ventana", "libro", 
    "libreria", "universidad", "escuela", "colegio", 
    "comida", "cangrejo", "jirafa"
];

let puntaje = 0;

function generarPalabrasAleatorias(cantidad) {
    let palabrasSeleccionadas = [];
    for (let i = 0; i < cantidad; i++) {
        const indiceAleatorio = Math.floor(Math.random() * palabras.length);
        palabrasSeleccionadas.push(palabras[indiceAleatorio]);
    }
    return palabrasSeleccionadas;
}

let palabrasAleatorias = generarPalabrasAleatorias(5);
document.getElementById('random-words').innerHTML = palabrasAleatorias.join(', ');

function actualizarPuntaje() {
    document.getElementById('puntaje').innerText = `Puntaje: ${puntaje}`;
}

document.getElementById('check-btn').addEventListener('click', function () {
    const inputUsuario = document.getElementById('user-input').value.trim().toLowerCase();
    const palabrasUsuario = inputUsuario.split(/[\s,]+/);
    const resultado = verificarPalabras(palabrasUsuario, palabrasAleatorias);

    if (resultado) {
        puntaje += 10;
        actualizarPuntaje();
        if (puntaje >= 100) {
            mostrarFelicitaciones(); // Mostrar modal de felicitaciones
        }
        palabrasAleatorias = generarPalabrasAleatorias(5);
        document.getElementById('random-words').innerHTML = palabrasAleatorias.join(', ');
        document.getElementById('user-input').value = '';
        document.getElementById('result').innerHTML = "<p style='color:green;'>¡Correcto! Todas las palabras son correctas.</p>";
    } else {
        document.getElementById('result').innerHTML = "<p style='color:red;'>Algunas palabras son incorrectas. Inténtalo de nuevo.</p>";
    }
});

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

function mostrarFelicitaciones() {
    const modal = new bootstrap.Modal(document.getElementById('felicitacionesModal'));
    modal.show();
}
