<?php
include 'connection.inc';

function getPost($index){
	return	(isset($_POST[$index])) ? $_POST[$index] : FALSE;
}

$service = getPost('service');

switch ($service) {
	case 'meaning':
		$word	 = getPost('word');
		$word && getMeaning($con, $word);
		break;
	
	default:
		echo "You Service is missing";
		break;
}

function getMeaning( $con, $word )
{
	$query 	= "SELECT s.word FROM t_swords AS s 
				JOIN t_eword_sword AS es ON s.id = es.sword 
				JOIN t_ewords AS e ON es.eword = e.id 
				WHERE e.word = '$word'";

	$result 	= $con->query($query) or die('Invalid query: ' . mysql_error());
	$result 	= mysqli_fetch_assoc($result);
	$meaning 	= $result['word'];

	echo "$word : $meaning ";
}
