<html>
<body>

You shared a link with <?php echo $_POST["name"]; ?> !<br>

Message : <?php echo $_POST["msg"]; ?><br>
  
URL : <?php echo $_POST["url"]; ?>
  
<?php
$myfile = fopen("client.txt", "a") or die("Unable to open file!");
$txt =  "TO$: ".$_POST["name"]."\n";
fwrite($myfile, $txt);
$txt =  "MSG$: ".$_POST["msg"]."\n";
fwrite($myfile, $txt);
$txt =  "LINK$: ".$_POST["url"]."\n\n";
fwrite($myfile, $txt);
fclose($myfile);
?>
  
 

</body>
</html>