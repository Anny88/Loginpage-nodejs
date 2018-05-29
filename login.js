module.exports = class Login {
    constructor(app, con) {
        this.connection = con;
        this.app = app;
    } 

    checkAndPost(){
        // Main route sends HTML file
        var self = this;
        this.app.get('/', function(req, res) {
            res.sendFile(__dirname + '/index.html');
        });

        //check if entered username is in the database
        this.app.post('/users', function (req, res) {
            var username = req.body.name;
            var logdb = "";
            self.connection.query("SELECT * FROM users WHERE name =?", username,
                function (err, result, req) {
                    if (err) throw err;
                    var r = result;  
                    if (r.length > 0){
                        res.send(r[0].name);
                        logdb = "Nutzer " + r[0].name +" hat sich erfolgreich angemeldet!";                
                    }
                    else {
                        logdb = 'Nutzer ' + username +' wurde nicht gefunden'; 
                        res.send('0');
                    }
                    console.log(logdb);

                    // Update logs table in MySQL database
                    self.connection.query('INSERT INTO logs (log) VALUES (?)', logdb, 
                        function (err, result) {
                            if (err) throw err; 
                            console.log("Log added to the database with id " + result.insertId);                   
                        }
                    );  
                    
                }
            );    
    
        });
    }  
   
}