<?php
include 'mysqls.php';

$service = getPost('service');

switch ($service) {
	case 'get':
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

function getMeaning($word) {
	$lang = 'en';
	$query 	= "SELECT s.word FROM t_swords AS s 
				JOIN t_eword_sword AS es ON s.id = es.sword 
				JOIN t_ewords AS e ON es.eword = e.id 
				WHERE e.word = '$word'";
	$result = Mysqls::run($query);

	if(!$result) {
		$query 	= "SELECT e.word FROM t_ewords AS e 
					JOIN t_eword_sword AS es ON e.id = es.eword 
					JOIN t_swords AS s ON es.eword = s.id 
					WHERE s.word = '$word'";
		$result = Mysqls::run($query);
		$lang = 'es';
	}
	if(!$result) {
		echo json_encode(array(
					'status' 	=> 500
				));
	}
	else {
		echo json_encode(array(
			'meaning' 	=> $result['word'],
			'language'	=> $lang,
			'status' 	=> 200
		));
	}
}
