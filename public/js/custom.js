$(function () {
	var socket = io();
	var name = "";

	$('form#form1').submit(function(){
	  name = $('#name').val();

	  if(name !== ""){
	    socket.emit('setUsername', name);
	    var user;
	    socket.on('userExists', function(data){
	    	$('.alert-danger').removeClass('hidden');
	    	$('.alert-danger').text(data);
	    });
	    socket.on('userSet', function(data){
	    	user = data.username;
	    	$("#entry-box").hide();
	    	$("#chat-box").removeClass("hidden");
	    	$('.alert-danger').addClass('hidden');
	    });
	  }
	  return false;
	});

	$('form#form2').submit(function(){
		var data = {msg : $('#m').val(), user: name};
		socket.emit('chat message', data);
		$('#m').val('');
		return false;
	});

	socket.on('chat message', function(data){
		var element = '<div class="'+data.user+' direct-chat-msg left"><div class="direct-chat-info clearfix"><span class="direct-chat-name float-left">'+data.user+'</span></div><img class="direct-chat-img" src="img/user.png" alt="message user image"><div class="direct-chat-text">'+data.msg+'</div></div>';
      	$('.direct-chat-messages').append(element);
      	$('.'+name+'.direct-chat-msg').removeClass('left');
		$('.'+name+'.direct-chat-msg').addClass('right');
		$('.'+name+' .direct-chat-name').removeClass('float-left');
		$('.'+name+' .direct-chat-name').addClass('float-right');
		$('.direct-chat-messages').scrollTop($('.direct-chat-messages')[0].scrollHeight);
	});
});