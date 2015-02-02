<!DOCTYPE HTML>
<html> 
<body>

<form action="sent.php" method="post">
<input type="text" name="name" placeholder="names"><br>
<textarea rows="4" cols="50" name="msg" placeholder="This reminds me of you ...">
</textarea><br> 
<input type="hidden" name="url" value='<?php echo $_GET["url"]; ?>'>
<input type="submit" value="send">
</form>


</body>
</html>