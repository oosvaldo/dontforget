<?php
include 'mysqls.php';

$service = getPost('service');

switch ($service) {
	case 'meaning':
		$word	 = getPost('word');
		$word && getMeaning($word);
		break;
	
	default:
		echo "You Service is missing";
		break;
}

function getPost($index) {
	return (isset($_POST[$index])) ? $_POST[$index] : FALSE;
}

function getMeaning($word ) {
	$query 	= "SELECT s.word FROM t_swords AS s 
				JOIN t_eword_sword AS es ON s.id = es.sword 
				JOIN t_ewords AS e ON es.eword = e.id 
				WHERE e.word = '$word'";

	$result 	= Mysqls::run($query);

	echo "$word : ". $result['word'];
}
