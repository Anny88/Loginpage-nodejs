var express    = require('express'),
    mysql      = require('mysql');
    connect = require('connect');
    bodyParser = require('body-parser'); 
    babel = require('babel-register');  

var http = require('http');
var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//connect to MySQL database
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port: '3307',
        database: 'test'
    });

var dbMan = require('./dbManager.js'); //import external class dbMAnager
var login = require('./login.js');  //import external class login
var newManager = new dbMan(connection);
var log = new login(app, connection);
log.checkAndPost();

//sample usernames for users table
var val = [    
    ['admin'], ['user1'], ['user2'],['kesselheld'],['ann']
]
/* create tables, insert sample data into usernames
will be done only once in the beginning*/
/*newManager.dropTables();
newManager.createTables();
newManager.insertUsers(val);
newManager.showUsers();*/
newManager.showLogs();

// Begin listening
app.listen(3001);
console.log("Express server listening");





