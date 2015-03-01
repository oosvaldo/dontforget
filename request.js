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
				res = jQuery.parseJSON(res);

				if(res.status == 200){
					if(res.lang == 'en'){
						$("#langmw").html('English');
						$("#langme").html('Spanish');
					} else {
						$("#langme").html('English');
						$("#langmw").html('Spanish')
					}
					meaning.val(res.meaning);
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
				res = jQuery.parseJSON(res);
				
				if(res.status == 200){
					meaning.val('SAVED');
					meaning.removeClass('word_box');
					meaning.addClass('success');
					setTimeout(function() {
						meaning.removeClass('success');
						meaning.addClass('word_box');
						meaning.val('');
						$('#t_save').hide();
						$('#t_send').show();
					}, 2000);
				} else {
					meaning.val('ERROR');
					meaning.removeClass('word_box');
					meaning.addClass('nofound');
					setTimeout(function() {
						meaning.removeClass('nofound');
						meaning.addClass('word_box');
						meaning.val('');
						$('#t_save').hide();
						$('#t_send').show();
					}, 2000);
				}
			}
		});
	}
}