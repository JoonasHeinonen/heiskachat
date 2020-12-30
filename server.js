const express = require('express');
const app = express();
const router = require('./routes/index');
const http = require('http').createServer(app);
const layouts = require('express-ejs-layouts');
const expressSession = require('express-session');
const expressValidator = require("express-validator");
const cookieParser = require('cookie-parser');
const connectFlash = require('connect-flash');
const methodOverride = require("method-override");
const io = require('socket.io')(http);

const mongoose = require('mongoose');
const MongoDB = require('mongodb').MongoClient;
const dbURL = 'mongodb://localhost:27017';
const dbName = 'heiskachat_db';
const db = mongoose.connection;

const port = 3000;

mongoose.connect(
    'mongodb://localhost:27017/heiskachat_db',
    {useNewUrlParser: true}
);
mongoose.set("useCreateIndex", true);

db.once('open', () => {
    console.log('Successfully connected to MongoDB using mongoose');
});

app.set('port', process.env.PORT || port)
app.set('view engine', 'ejs');

router.use(
    methodOverride("_method", {
        methods: ["POST", "GET"]
    })
);

router.use(layouts);
router.use(express.static('public'));
router.use(
    express.urlencoded({
      extended: false
    })
);
router.use(express.json());

router.use(cookieParser('secret_passcode'));
router.use(
    expressSession({
        secret: 'secret_passcode',
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);
router.use(connectFlash());

io.on('connection', function(socket) {
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});
app.use("/", router);

// https://socket.io/get-started/chat/
http.listen(port, () => {
    console.log('Listening on the address 127.0.0.1:' + port);
});