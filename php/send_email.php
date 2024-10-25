<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);


    $to = "dmazariegosm8@miumg.edu.gt";
    $subject = "Nuevo mensaje de contacto";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $body = "<h2>Nuevo mensaje de contacto</h2>";
    $body .= "<p><strong>Nombre:</strong> {$name}</p>";
    $body .= "<p><strong>Email:</strong> {$email}</p>";
    $body .= "<p><strong>Mensaje:</strong><br>{$message}</p>";

    if (mail($to, $subject, $body, $headers)) {
        echo "El mensaje ha sido enviado correctamente.";
    } else {
        echo "Error al enviar el mensaje. Inténtalo de nuevo más tarde.";
    }
:
}
?>
