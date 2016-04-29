var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8080});
wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
		//console.log('Clinets', wss.clients);
    });
    ws.send('something');
	//ws.send(JSON.stringify(wss.clients[0]));
	
	
	var cache = [];
ws.send(JSON.stringify(wss.clients, function(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) {
            // Circular reference found, discard key
            return;
        }
        // Store value in our collection
        cache.push(value);
    }
    return value;
}));
cache = null;
	
});

/*var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/',function(req,res){
	//res.send("<h2>Hello Socket</h2>");
	res.sendFile(__dirname + '/html/index.html');
});	

io.on('connection', function(socket){
	console.log('A user connected');
	socket.on('CMsg',function(msg){
		io.emit('CMsg', msg);
		console.log(msg);
	});
	socket.on('disconnect', function(){
		console.log('A user disconnected');
	});
});

http.listen(3000, function(){
	console.log("Running...");
});*/