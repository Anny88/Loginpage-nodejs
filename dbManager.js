module.exports = class dbManager {
    constructor(con) {
        this.connection = con;
    }
    createDB(){
        this.connection.query('CREATE DATABASE IF NOT EXISTS test', function (err) {
            if (err) throw err;
            console.log("DB test created");
        });
    }
    createTables() {
       
        this.connection.query('CREATE TABLE IF NOT EXISTS users('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'name VARCHAR(30)'
            + ')', function (err) {
                if (err)
                    throw err;
                console.log("table users created");
        });
        this.connection.query('CREATE TABLE IF NOT EXISTS logs('
            + 'id INT NOT NULL AUTO_INCREMENT,'
            + 'PRIMARY KEY(id),'
            + 'log VARCHAR(150)'
            + ')', function (err) {
                if (err)
                    throw err;
                console.log("table logs created");
        });            
    }

    insertUsers(values) {
        this.connection.query('INSERT INTO users (name) VALUES ?', [values], function (err, result) {
            if (err)
                throw err;
            console.log("Number of users inserted: " + result.affectedRows);
        });
    }
    showLogs() {
        this.connection.query("SELECT * FROM logs ", function (err, result, req) {
            if (err)
                throw err;
            console.log(result);
        });
    }
    showUsers() {
        this.connection.query("SELECT * FROM users ", function (err, result, req) {
            if (err)
                throw err;
            console.log(result);
        });
    }

    static selectUser(usname) {
        this.connection.query("SELECT * FROM users WHERE name =?", usname,
            function (err, result, req) {
                if (err) throw err;
                return result;
            });
    }
    dropTables() {
        this.connection.query('DROP TABLE IF EXISTS users;', function (err) {
            if (err)
                throw err;
            console.log("table users dropped");
        });
        this.connection.query('DROP TABLE IF EXISTS logs;', function (err) {
            if (err)
                throw err;
            console.log("table logs dropped");
        });
    }
}
 
 
 
