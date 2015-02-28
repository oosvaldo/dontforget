$(document).ready(function(){

});


function sendWord(){
	var meaning = $("#meaning"),
	 	word 	= $("#word").val();
	 
	if(word != '') {
		$("#myword").html(word);
		$.ajax({
			data: {'service': 'meaning', 'word': word},
			type: "POST",
			url : "server.php",
			success: function(response){
				if(response.indexOf('200') > 0){
					if(response.indexOf('en') > 0){
						$("#langmw").html('English');
						$("#langme").html('Spanish');
					} else {
						$("#langme").html('English');
						$("#langmw").html('Spanish')
					}
					meaning.html(response);
				} else {
					meaning.html('NO FOUND');
					meaning.removeClass('word_box');
					meaning.addClass('nofound');
					setTimeout(function() {
						meaning.removeClass('nofound');
						meaning.addClass('word_box');
						meaning.html('----');
					}, 3000);
				}
			} 
		});
	}
}
