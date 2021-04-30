const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { orgin: "*"}
});

var board = new Array(225);
var bag = ['E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'S_1', 'S_1', 'S_1', 'S_1', 'S_1', 'S_1', 'S_1', 'I_1', 'I_1', 'I_1', 'I_1', 'I_1', 'I_1', 'R_1', 'R_1', 'R_1', 'R_1', 'R_1', 'R_1', 'T_1', 'T_1', 'T_1', 'T_1', 'T_1', 'T_1', 'U_1', 'U_1', 'U_1', 'U_1', 'U_1', 'U_1', 'A_1', 'A_1', 'A_1', 'A_1', 'A_1', 'D_1', 'D_1', 'D_1', 'D_1', 'H_2', 'H_2', 'H_2', 'H_2', 'M_3', 'M_3', 'M_3', 'M_3', 'G_2', 'G_2', 'G_2', 'L_2', 'L_2', 'L_2', 'O_2', 'O_2', 'O_2', 'B_3', 'B_3', 'C_4', 'C_4', 'F_4', 'F_4', 'K_4', 'K_4', 'W_3', 'Z_3', 'P_4', 'J_6', 'V_6', 'X_8', 'Q_10', 'Y_10'];

var turn = 0;
var playerCount = 0;
var gameInProg = false;
var players = new Map();

io.on('connection', (socket) => {
	console.log('player connected');
    let transitString = JSON.stringify(Array.from(players));

    io.to(socket.id).emit('players', transitString);

    playerCount += 1;
    socket.on('joined', (name) => {
        io.emit('newUser', name);
        players.set(socket.id, name);
    });

    socket.on('start', () => {
        io.emit('startServer', playerCount);
        console.log('received start event');
    })

    socket.on('done', (data) => {
    	console.log('done event received');
    	turn = (turn + 1) % playerCount;
    	console.log('current turn is now: ' + (turn + 1));
    	console.log('player count: ' + playerCount);
        io.emit('doneServer', {turn: (turn + 1), board: data['board'], bag: data['bag']});
    });

    socket.on('disconnect', () => {
        if (playerCount > 0) {    
        	playerCount -= 1;
            players.delete(socket.id);
        }
        console.log('player disconnected')
    })

});


http.listen(process.env.PORT || 8080);
// 
