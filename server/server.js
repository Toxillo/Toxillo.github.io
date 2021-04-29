const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { orgin: "*"}
});

var turn = 0;
var playerCount = 0;
var gameInProg = false;

io.on('connection', (socket) => {
	console.log('player connected');

    socket.on('joined', (name) => {
        playerCount += 1;
        io.emit('newUser', name); 
    });



    socket.on('start', () => {
        io.emit('info', {playerCount: playerCount, turn: turn + 1});
    })

    socket.on('done', (message) => {
    	console.log('done event received');
    	turn = (turn + 1) % playerCount;
    	console.log('current turn is now: ' + turn + 1);
    	console.log('player count: ' + playerCount);
        io.emit('doneServer', (turn + 1));
    });

    socket.on('disconnect', () => {
    	playerCount -= 1;
    	console.log('player disconnected')
    })

});


http.listen(process.env.PORT || 8080);

//process.env.PORT || 