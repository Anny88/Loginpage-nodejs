var express    = require('express'),
    mysql      = require('mysql');
    connect = require('connect');

    bodyParser = require('body-parser'); 


var http = require('http');
var app = express();
var server = http.createServer(app);
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//connect to MySQL database
var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        port: '3307',
        database: 'test'
    });
    


// Database setup

connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
    if (err) throw err;
    connection.query('USE test', function (err) {
        if (err) throw err;
        connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(30)'
            +  ')', function (err) {
                if (err) throw err;
        });
        connection.query('CREATE TABLE IF NOT EXISTS logs('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'log VARCHAR(150)'
            +  ')', function (err) {
                if (err) throw err;
                console.log("table logs created");
        });    
    });
}); 

// Configuration

// Main route sends our HTML file

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


//check if entered username is in the database
app.post('/users', function (req, res) {
    var username = req.body.name;
    var logdb = "";
    connection.query("SELECT * FROM users WHERE name =?", [username],
        function (err, result, req) {
            if (err) throw err;
            
            if (result.length > 0){
                res.send(result[0].name);
                logdb = "Nutzer " + result[0].name +" hat sich erfolgreich angemeldet!";
                
            }
            else {
                logdb = 'Nutzer ' + username +' wurde nicht gefunden'; 
                res.send('0');
            }
            console.log(logdb);

            // Update logs table in MySQL database
            connection.query('INSERT INTO logs (log) VALUES (?)', logdb, 
                function (err, result) {
                    if (err) throw err; 
                    console.log("added to a db with id " + result.insertId);                   
                }
            );  
              
        }
    );
    
    
});
connection.query("SELECT * FROM logs ", 
        function (err, result, req) {
            if (err) throw err;
            console.log(result);
        }
);

// Begin listening

app.listen(3001);
console.log("Express server listening");