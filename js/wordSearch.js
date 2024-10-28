const palabras = [
    "gato", "perro", "casa", "coche", "árbol", "montaña", 
    "sol", "luna", "estrella", "mar", "ventana", "libro", 
    "libreria", "universidad", "escuela", "colegio", 
    "comida", "cangrejo", "jirafa"
  ];
  
  let puntaje = 0;
  let nombreUsuario = '';
  
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
  
  // Función para solicitar el nombre de usuario al alcanzar los 100 puntos
  function solicitarNombreUsuario() {
      nombreUsuario = prompt("¡Felicidades! Has alcanzado 100 puntos. Por favor, ingresa tu nombre para el informe:");
      if (nombreUsuario) {
          generarInformePDF();
      }
  }
  
  // Función para generar el informe en PDF
  function generarInformePDF() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
  
      doc.setFontSize(16);
      doc.text("Informe del Juego de Búsqueda de Palabras", 20, 20);
      doc.setFontSize(12);
      doc.text(`Nombre del Jugador: ${nombreUsuario}`, 20, 40);
      doc.text(`Puntaje Alcanzado: ${puntaje}`, 20, 50);
      doc.text(`Palabras Encontradas: ${palabrasAleatorias.join(', ')}`, 20, 60);
  
      doc.save("informe_juego.pdf");
  }
  
  // Llama a la función de solicitud del nombre del usuario cuando se alcanzan 100 puntos
  function mostrarFelicitaciones() {
      const modal = new bootstrap.Modal(document.getElementById('felicitacionesModal'));
      modal.show();
  
      // Al cerrar el modal, solicitar el nombre y generar el informe
      modal._element.addEventListener('hidden.bs.modal', function () {
          if (puntaje >= 100) {
              solicitarNombreUsuario();
          }
      });
  }
  