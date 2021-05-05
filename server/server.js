const http = require('http').createServer();

const io = require('socket.io')(http, {
    cors: { orgin: "*"}
});

var initBag = ['E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'E_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'N_1', 'S_1', 'S_1', 'S_1', 'S_1', 'S_1', 'S_1', 'S_1', 'I_1', 'I_1', 'I_1', 'I_1', 'I_1', 'I_1', 'R_1', 'R_1', 'R_1', 'R_1', 'R_1', 'R_1', 'T_1', 'T_1', 'T_1', 'T_1', 'T_1', 'T_1', 'U_1', 'U_1', 'U_1', 'U_1', 'U_1', 'U_1', 'A_1', 'A_1', 'A_1', 'A_1', 'A_1', 'D_1', 'D_1', 'D_1', 'D_1', 'H_2', 'H_2', 'H_2', 'H_2', 'M_3', 'M_3', 'M_3', 'M_3', 'G_2', 'G_2', 'G_2', 'L_2', 'L_2', 'L_2', 'O_2', 'O_2', 'O_2', 'B_3', 'B_3', 'C_4', 'C_4', 'F_4', 'F_4', 'K_4', 'K_4', 'W_3', 'Z_3', 'P_4', 'J_6', 'V_6', 'X_8', 'Q_10', 'Y_10'];

/*
Order of elements in games map array
0: board
1: bag
2: turn
3: playerCount
4: players
*/

var gameInProg = false;
var games = new Map();

io.on('connection', (socket) => {
	console.log('player connected');

    socket.on('joined', (data) => {
        id = data['lobbyID'];
        if (games.has(data['lobbyID'])) {
            if (!Array.from(games.get(id)[4].values()).includes(data['username'])) {
                socket.emit('success');
                socket.join(id);
                gameArray = games.get(id);
                gameArray[3] = gameArray[3] + 1;
                gameArray[4].set(socket.id, data['username']);

                players = JSON.stringify(Array.from(gameArray[4]));
                socket.emit('info', players);
                console.log(players);
                socket.to(id).emit('newUser', data['username']);
            } else {
                socket.emit('error', 'Failed to join! This username is already taken.');
            }
        } else {
            socket.emit('error', 'Failed to join! There is no lobby with the id \'' + id + '\'');
        }
    });

    socket.on('start', () => {
        io.emit('startServer');
        console.log('received start event');
    });

    socket.on('new', (id) => {
        board = new Array(255);
        bag = initBag;
        turn = 0;
        playerCount = 0;
        players = new Map();
        games.set(id, [board, bag, turn, playerCount, players]);
        console.log('created new game with the id: ' + id);
        socket.join(id);
        io.to(id).emit('newServer');
        console.log('Server sent new game event');
    });

    socket.on('done', (data) => {
    	console.log('done event received');
        console.log('turn ' + games.get(data['lobbyID'])[2] + ' and players ' + games.get(data['lobbyID'])[3]);
    	turn = (games.get(data['lobbyID'])[2] + 1) % games.get(data['lobbyID'])[3];
        io.to(data['lobbyID']).emit('doneServer', {turn: (turn + 1), board: data['board'], bag: data['bag']});
        games.get(data['lobbyID'])[2] = turn;
    });

    socket.on('disconnect', () => {
    })

});


http.listen(process.env.PORT || 8080);
// 
