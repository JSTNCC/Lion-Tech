<!DOCTYPE html>

<html>
<head>
      <title> Pagina Principal</title>
</head>
<body>
<?php
$server="localhost";
$usuario="root";
$contrasena="";
$bd="prueba1";

$conexion=mysqli_connect($server,$usuario,$contrasena,$bd)
or die ("error de conexion");

$correo=$_POST['txtcorreo'];
$producto=$_POST['txtproducto'];
$precio=$_POST['txtprecio'];

$insertar= "INSERT INTO products 
values ('$correo','$producto','$precio')";

$resultado=mysqli_query($conexion,$insertar) 
or die ("error de inserción");

mysqli_close($conexion);

echo '<script>alert("Datos insertados correctamente")</script> ';
echo "<script>location.href='comprar.html'</script>";

?>

</body>
</html>