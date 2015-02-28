$(document).ready(function(){

});


function sendWord(){
	var meaning = $("#meaning"),
	 	word 	= $("#myword").val();

	if(word != '') {
		$.ajax({
			data: {'service': 'get', 'word': word},
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
					meaning.val(response);
				} else {
					meaning.val('NO FOUND');
					meaning.removeClass('word_box');
					meaning.addClass('nofound');
					setTimeout(function() {
						meaning.removeClass('nofound');
						meaning.addClass('word_box');
						meaning.val('');
						meaning.removeAttr('disabled');
					}, 2000);
				}
			} 
		});
	}
}
