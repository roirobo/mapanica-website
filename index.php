---
layout: default
lang: es
---

<div id="title">
<h1>mapanica.net</h1>
<h3>Grupo de OpenStreetMap Nicaragua</h3>
</div>
<p>Somos un grupo de personas interesadas en mapeo, tecnologías o con el simple deseo de mejorar nuestro entorno. Para eso usamos tecnologías libres y datos abiertos.</p>

<h2>Próximos eventos</h2>
<p>Sábado, 2013-09-28:
  <strong>Fiesta de Mapeo - Rutas de Managua</strong><br />
  10am, <a href="http://co-labora.net">co-labora</a> (Del busto Jośe Martí 30vrs arriba, Managua)<br />
  (El evento no tiene costo, ni requisitos de conocimiento previo o tecnológico)
</p>


<h2>Puntos de encuentro</h2>
<div class="links">
  <a href="http://www.facebook.com/mapanica"><img valign="middle" hspace="15" vspace="10" src="images/facebook.png" alt="Facebook" name="Facebook" /></a> Página en Facebook.<br />
  <a href="http://wiki.openstreetmap.org/wiki/WikiProject_Nicaragua"><img valign="middle" hspace="15" vspace="10" src="images/osm_logo_wiki.png" alt="Wiki de OpenStreetMap" name="Wiki de OpenStreetMap" /></a> Wiki de OpenStreetMap<br />
  <a href="http://lists.openstreetmap.org/listinfo/talk-ni"><img valign="middle" hspace="15" vspace="10" src="images/email.png" alt="Lista de correo" name="Lista de correo" /></a> Lista de correo<br />
</div>

<h2>Proyectos actuales</h2>

<div>
  <img src="images/buses.png" align="right" hspace="20" />
  <h4>Rutas de transporte urbano</h4>
  <p>En nconjunto mapeamos el transporte urbano colectivo de Managua y creamos una aplicación web confortable</p>
</div>
<br />
<div>
  <img src="images/taller.png" align="right" hspace="20" />
  <h4>Mercado Oriental</h4>
  <p>Conocerdores del mercado y los que lo quieren ser, mapeamos el mercado mas grande de Centroamerica.</p>
</div>
<br />
<div>
  <img src="images/arbolito.png" align="right" hspace="20" />
  <h4>Puntos de referencia</h4>
  <p>Respondiendo la necesidad local de direcciones en Centroamerica, propusimos un <a href="http://wiki.openstreetmap.org/wiki/Key:reference_point">manjeo adecuado</a> en OpenStreetMap, y ahora estanmos marcando los puntos relevantes.</p>
</div>


<h2>Suscribirse</h2>
<div class="subscription-form">
<?php
// RECEPTOR ADDRESS
$mail_to="maps@delattre.de";

if (isset($_POST['fromname'])) {
  $from_name=$_POST['fromname'];
  $from_mail=$_POST['frommail'];
  $information=$_POST['information'];
  $rent=$_POST['rent'];
  $mail_text=$_POST['mailtext'];
  $send=$_POST['s'];

  if(trim($from_name)=="") $err_text.="Por favor diganos su nombre.<br>";
  if(trim($information)=="") $err_text.="Por favor selecione si está dispuesta/o a alquilar o simplemente quiere recibir noticias.<br>";
  if(trim($from_mail)=="")
    $err_text.="Por favor diganos la dirección de su correo electrónico.<br>";
  else
    if(!ereg("^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$",$from_mail))
      $err_text.="Por favor comprueba la validez de su dirección de correo electrónico.<br>";

  $from_name=str_replace(chr(34),"''",$from_name);
  $mail_subject=str_replace(chr(34),"''",$mail_subject);
  $from_name=stripslashes($from_name);
  $from_mail=stripslashes($from_mail);
  $mail_subject=stripslashes($mail_subject);
  $mail_text=stripslashes($mail_text);
}
else {
  $from_name = $from_mail = '';
  $send = FALSE;
}

if(($send=="1") && (isset($err_text))) {
  echo "<p class='error message'>";
  echo "$err_text</p>";
}


if(($send != "1") || (isset($err_text))) {
?>

<form action="index.php" method="post">
<table border=0 cellspacing=2 cellpadding=0 width=100%>
<tr>
  <td nowrap align=right>Nombre:</td>
  <td width=100%><input type="text" name="fromname" size=40 maxlength=120 value="<?php echo $from_name; ?>"></td>
</tr>
<tr>
  <td nowrap align=right>Correo electrónico:</td>
  <td width=100%><input type="text" name="frommail" size=35 maxlength=120 value="<?php echo $from_mail; ?>"></td>
</tr>

<tr>
  <td></td>
  <td><input type="checkbox" name="information" value="Deseando recibir información">Deseo recibir noticias sobre los proyectos del grupo de OpenStreetMap Nicaragua.<br />
  <input type="hidden" value="1" name="s">
</tr>
<tr>
  <td colspan="2" align="right"><input type="submit" value="Suscribir" name="submit"></td>
</tr>
</table>
</form>

<?php
} else {
  $header="From: $from_name <$from_mail>\n";
  $header.="Reply-To: $from_mail\n";
  $header.="X-Mailer: PHP-FormMailer (www.gaijin.at)\n";
  $header.="Content-Type: text/plain";
  $mail_date=gmdate("D, d M Y H:i:s")." GMT";
  $send=0;
  $mail_subject = 'Suscripcion mapanica.net';
  $mail_text = $from_name . ' se ha suscrito al sitio de mapanica.net. Con las siguientes solicitudes: ' . $information . ' ' . $rent;
  if(@mail($mail_to,$mail_subject,$mail_text,$header))
  {
    echo "<p class='success message'><b>Usted se ha suscrito con exito.</b></p>";
  }else{
    echo "<p class='error message'><b>Hubo un error en el sistema</b></p>";
  }
}
?>
</div>

