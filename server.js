const express = require('express');
const app = express();
const http = require('http').createServer(app);
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const io = require('socket.io')(http);

const port = 3000;

const chatController = require('./controllers/chatController');

app.set('port', process.env.PORT || port)
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(layouts);
app.use(
    express.urlencoded({
      extended: false
    })
);

app.get('/', chatController.chat);
app.get('/login', chatController.login);
app.get('/signup', chatController.signup);

io.on('connection', function(socket) {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log('Listening on the address 127.0.0.1:' + port);
});