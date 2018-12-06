var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/play', urlencodedParser, function (req, res) {
  if (!req.body || !req.body.letter) {
    io.emit('play letter', '0');
    return res.sendStatus(400);
  }
  res.sendStatus(200);
  io.emit('play letter', req.body.letter);
})

app.use(express.static("static"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.post('/dogs', function(req, res){
  res.status(200);
  res.send('SUCCESS');
  io.emit('chat message', 'THIS WORKED');
});

app.get('/hint', function(req, res){
// TODO: this
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
