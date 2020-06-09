const port = 7070;
const host = '127.0.0.1';

const app = require('express')();
const server = require('http').Server(app);
const io = require("socket.io")(server);


var user = {}

server.listen(port);
console.log("listening")
app.get('/', (req, res) => {
	res.send('<h1>Hello world</h1>');
	console.log(req.headers)
  });

io.on('connection', (socket) => {
	socket.on('USERINFO', (data) => {
		console.log(data);
		try {
			console.log(data.userid + " was given: " + sockets.length)
			user[data.userid] = sockets.length
			sockets.push(socket)
			socket.emit('USERINFO', data);
		} catch (error) {
			console.log(error)
			console.log("That didn't work")
		}
		Object.keys(user).forEach((u)=>{
			sockets[user[u]].emit('shake',Object.keys(user))
		})
	});

	socket.on('comment', (data) => {
		console.log(data);
		try {
			console.log(data.userid + " was given: " + sockets.length)
			user[data.userid] = sockets.length
			sockets.push(socket)
			socket.emit('USERINFO', data);
		} catch (error) {
			console.log(error)
			console.log("That didn't work")
		}
		Object.keys(user).forEach((u)=>{
			sockets[user[u]].emit('shake',Object.keys(user))
		})
	});

	socket.on('disconnect', function () {
		var i = sockets.indexOf(socket)
		console.log("disconnected: " + i)
		if (i > 1){
			try {
				sockets.splice(i, 1);
				delete user[getUserFromSocket(i)]
				console.log(user)
				console.log(sockets.length)
				Object.keys(user).forEach((u)=>{
					sockets[user[u]].emit('shake',Object.keys(user))
				})
			} catch (error) {
				console.log(error)
			}
		}
	});
});

getUserFromSocket = function(ind){
// Takes in socket index returns key of user
	var temp = Object.keys(user)
	for (let i = 0; i < temp.length; i++) {
		if (user[temp[i]] == ind){
			return temp[i]
		}
	}
	return '-1'
}