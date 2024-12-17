// Create web server
// npm install express
// npm install body-parser
// npm install mysql
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'comments'
});

connection.connect(function(err) {
  if (err) {
    console.log(err);
  }
  console.log('Connected to database');
});

// Create comments table
connection.query(
  'CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT PRIMARY KEY, comment TEXT)',
  function(err) {
    if (err) {
      console.log(err);
    }
  }
);

// Get all comments
app.get('/comments', function(req, res) {
  connection.query('SELECT * FROM comments', function(err, results) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

// Get a specific comment
app.get('/comments/:id', function(req, res) {
  connection.query(
    'SELECT * FROM comments WHERE id = ?',
    [req.params.id],
    function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    }
  );
});

// Add a new comment
app.post('/comments', function(req, res) {
  connection.query(
    'INSERT INTO comments (comment) VALUES (?)',
    [req.body.comment],
    function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    }
  );
});

// Update a comment
app.put('/comments/:id', function(req, res) {
  connection.query(
    'UPDATE comments SET comment = ? WHERE id = ?',
    [req.body.comment, req.params.id],
    function(err, results) {
      if (err) {
        console.log(err);
      }
      res.json(results);
    }
  );
});

// Delete a comment
app.delete('/comments/:id', function(req, res) {
  connection.query(
    'DELETE FROM comments WHERE id = ?',
    [req.params.id],
    function(err, results) {
      if (err) {
        console.log(err);
      }
      res