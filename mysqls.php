<?php

class Mysqls{

	static function run($query){
		include 'connection.inc';

		$result 	= $con->query($query) or die('Invalid query: ' . mysql_error());
		$result 	= mysqli_fetch_assoc($result);
		
		$con->close();
		return $result;
	}
	
}