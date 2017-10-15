<?php 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $comment = $_POST["comment"];
}

$to = "icacocreativo@gmail.com"; 
$subject = "Coferba contacto WEB"; 
$body = ' 
<html> 
<body> 
<h1>Mensaje Recibido</h1> 
<p> 
Nombre  : '. $name. '<br>
Correo  : '.$email. '<br> 
Telefono: '. $phone. '<br>
Mensaje : '.$comment. '<br>
</body> 
</html> 
'; 


//para el envío en formato HTML 
$headers = "MIME-Version: 1.0\r\n"; 
$headers .= "Content-type: text/html; charset=iso-8859-1\r\n"; 

//dirección del remitente 
$headers .= "From: ".$name. "<".$email.">\r\n"; 

//dirección de respuesta, si queremos que sea distinta que la del remitente 
$headers .= "Reply-To:".$name."<".$email.">\r\n"; 

//ruta del mensaje desde origen a destino 
//$headers .= "Return-path: holahola@desarrolloweb.com\r\n"; 

//direcciones que recibián copia 
$headers .= "Cc: David Rincon <rexx84@gmail.com>\r\n"; 

//direcciones que recibirán copia oculta 
//$headers .= "Bcc: pepe@pepe.com,juan@juan.com\r\n"; 

mail($to,$subject,$body,$headers);
header("Location:index.html");
?>