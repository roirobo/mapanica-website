---
layout: default
lang: es
---

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

