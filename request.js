$(document).ready(function(){
	if($("#meaning").val() === ''){
		$('#t_save').hide();
	}
	else{
		$('#t_send').hide();
	}

	$("#meaning").blur(function(){
		if($(this).val() === ''){
			$('#t_save').hide();
			$('#t_send').show();
		}
		console.log($(this).val());
	});

	$("#meaning").focus(function(){
		$('#t_save').show();
		$('#t_send').hide();
	});
});

function sendWord(){
	var meaning = $("#meaning"),
	 	word 	= $("#myword").val();

	if(word != '') {
		$.ajax({
			data: {'service': 'get', 'word': word},
			type: "POST",
			url : "server.php",
			success: function(res){
				if(res.indexOf('200') > 0){
					if(res.indexOf('en') > 0){
						$("#langmw").html('English');
						$("#langme").html('Spanish');
					} else {
						$("#langme").html('English');
						$("#langmw").html('Spanish')
					}
					meaning.val(res);
					//meaning.addAttr('disabled');
				} else {
					meaning.val('NO FOUND');
					meaning.removeClass('word_box');
					meaning.addClass('nofound');
					setTimeout(function() {
						meaning.removeClass('nofound');
						meaning.addClass('word_box');
						meaning.val('');
					}, 2000);
				}
			} 
		});
	}
}

// Send the meaning and the word to save
function saveWord(){
	var meaning = $("#meaning"),
	 	word 	= $("#myword").val();

	if(word !== '' && meaning.val() !== ''){
		$.ajax({
			data: {'service': 'set', 'word': word, 'mean' : meaning.val()},
			type: "POST",
			url : "server.php",
			success: function(res){
				meaning.val(res);
			}
		});
	}
}