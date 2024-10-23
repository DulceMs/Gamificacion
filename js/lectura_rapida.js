let velocidad = 200;
let intervalo;
let palabrasLeidas = 0;
let tiempoInicio;

document.getElementById('iniciar').addEventListener('click', iniciarLectura);
document.getElementById('parar').addEventListener('click', pararLectura);
document.getElementById('aumentar').addEventListener('click', aumentarVelocidad);
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

async function obtenerTexto() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes?q=language:es&maxResults=40');
    const data = await response.json();
    const libro = data.items[Math.floor(Math.random() * data.items.length)];
    return `${libro.volumeInfo.title}. ${libro.volumeInfo.description || 'Sin descripción disponible.'}`;
}

async function iniciarLectura() {
    clearInterval(intervalo);
    const texto = await obtenerTexto();
    const palabras = texto.split(' ');
    palabrasLeidas = 0;
    tiempoInicio = Date.now();
    let indice = 0;

    intervalo = setInterval(() => {
        if (indice < palabras.length) {
            document.getElementById('texto').innerHTML = palabras[indice++];
            palabrasLeidas++;
        } else {
            clearInterval(intervalo);
            mostrarResultado();
        }
    }, velocidad);
}

function pararLectura() {
    clearInterval(intervalo);
    mostrarResultado();
}

function aumentarVelocidad() {
    velocidad = Math.max(50, velocidad - 50);
}

function reiniciarJuego() {
    clearInterval(intervalo);
    document.getElementById('texto').innerText = '';
    document.getElementById('resultado').innerText = '';
    palabrasLeidas = 0;
    velocidad = 200;
}

function mostrarResultado() {
    const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
    document.getElementById('resultado').innerText = `Palabras leídas: ${palabrasLeidas}. Tiempo: ${tiempoTotal} segundos.`;
}
