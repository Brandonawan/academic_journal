const express = require('express');

const mysql = require("mysql");
const port = process.env.PORT || 3001;
const app = express()


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set the view engine to ejs
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

app.post('/', (req, res) => {
    const { username, email, password1, password2 } = req.body;
    
    console.log(username, email, password1, password2);
    if (password1 === password2) {
        res.send("Welcome, login successful");
    } else {
        console.log("Passwords do not match");
        res.send("Passwords do not match");
    }
    
  });


// Create connection
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: ""
    });
  
db.connect(function(err) {
    // if (err) throw err;
    if (err) {
        try { 
            console.log("db not connected");
        }
        catch (err) {
            console.log(err);
           }
    }else {
        console.log("db Connected!");
    }
    });

// create table
app.get("/createdb", (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS users(name VARCHAR(255), email VARCHAR(255), password1 VARCHAR(100), password2 VARCHAR(100) NOT NULL, PRIMARY KEY (email))";
    db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      res.send("users table created");
    });
  });
  
//   get users
  app.get("/users", (req, res) => {
    let sql = "SELECT * FROM users"
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

//   insert data
  app.get("/", (req, res) => {

    // let post = { name: "Jake Smith", designation: "Chief Executive Officer" };
    let post = { username, email, password1, password2 } = req.body;
  
    let sql = "INSERT INTO users SET ?";
  
    let query = db.query(sql, post, (err) => {
      if (err) {
  
        throw err;
      }
      res.send("Employee 1 added");
    });
  
  });

// update
app.get("/update/:id", (req, res) => {
    let newName = "Brandon";
    let sql = `UPDATE users SET name = '${newName}' WHERE id = ${req.params.id}`;
  
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send("User detail updated");
    });
  });
  


// delete
app.get("/delete/:id", (req, res) => {

    let newName = "Brandon";

    let sql = `DELETE FROM users WHERE id = ${req.params.id}`;
  
    let query = db.query(sql, (err) => {

      if (err) {
  
        throw err;
      }
      res.send("User detail deleted");
    });
  
  });

app.listen(port, function(){
    console.log(`App running on port ${port}`)
})