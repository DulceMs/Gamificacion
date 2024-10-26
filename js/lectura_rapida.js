let velocidad = 200;
let intervalo;
let palabrasLeidas = 0;
let tiempoInicio;

document.getElementById('iniciar').addEventListener('click', iniciarLectura);
document.getElementById('parar').addEventListener('click', pararLectura);
document.getElementById('aumentar').addEventListener('click', aumentarVelocidad);
document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);
document.getElementById('usarTexto').addEventListener('click', usarTextoIngresado);

// Función con reintento para manejar límite de peticiones (error 429)
async function fetchWithRetry(url, retries = 3, delay = 1000) {
    for (let i = 0; i < retries; i++) {
        const response = await fetch(url);
        if (response.ok) return response;

        if (response.status === 429) {
            console.warn('Límite de peticiones excedido. Reintentando...');
            await new Promise(res => setTimeout(res, delay));
        } else {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
    }
    throw new Error('No se pudo completar la solicitud.');
}

// Obtener texto con manejo de errores
async function obtenerTexto() {
    try {
        const response = await fetchWithRetry('https://www.googleapis.com/books/v1/volumes?q=language:es&maxResults=40');

        const data = await response.json();

        if (!data.items || data.items.length === 0) {
            throw new Error('No se encontraron libros disponibles.');
        }

        const libro = data.items[Math.floor(Math.random() * data.items.length)];
        return `${libro.volumeInfo.title}. ${libro.volumeInfo.description || 'Sin descripción disponible.'}`;

    } catch (error) {
        console.error('Error al obtener el texto:', error);
        return 'No se pudo obtener el texto. Por favor, inténtelo más tarde.';
    }
}

// Iniciar lectura con verificación del texto obtenido
async function iniciarLectura() {
    clearInterval(intervalo);
    const texto = await obtenerTexto();

    if (texto.startsWith('No se pudo obtener')) {
        document.getElementById('texto').innerText = texto;
        return;
    }

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

// Usar texto ingresado en el cuadro de texto
function usarTextoIngresado() {
    clearInterval(intervalo);
    const texto = document.getElementById('inputTexto').value;

    if (texto.trim() === '') {
        document.getElementById('texto').innerText = 'Por favor, ingresa un texto.';
        return;
    }

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
    document.getElementById('inputTexto').value = ''; // Limpiar el cuadro de texto
}

function mostrarResultado() {
    const tiempoTotal = Math.round((Date.now() - tiempoInicio) / 1000);
    document.getElementById('resultado').innerText = `Palabras leídas: ${palabrasLeidas}. Tiempo: ${tiempoTotal} segundos.`;
}
