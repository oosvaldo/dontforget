$(document).ready(function(){

});


function sendWord(){
	var meaning = $("#meaning"),
	 	word 	= $("#word").val();

	$.ajax({
		data: {'service': 'meaning', 'word': word},
		type: "POST",
		url : "server.php",
		success: function(response){
			meaning.html(response);
		} 
	});
}
