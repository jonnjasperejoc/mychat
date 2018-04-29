var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/', function(req, res){
	res.render('index');
});

users = [];
io.on('connection', function(socket){
	console.log("A user connected!!!");
	socket.on('setUsername', (data) => {
		if(users.indexOf(data) == -1){
			users.push(data);
			socket.emit('userSet', {username: data});
		} else {
			socket.emit('userExists', data + ' is taken! Try some other username.');
		}
	});

  	socket.on('chat message', function(data){
    	io.emit('chat message', data);
  	});
});

http.listen(port, function(){
  console.log('listening on *: '+port);
});