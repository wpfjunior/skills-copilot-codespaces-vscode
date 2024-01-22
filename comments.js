// Create web server
// Run: node comments.js
// Test: curl -X GET http://localhost:3000/comments
// Test: curl -X POST -d "author=Scott&text=This is my comment" http://localhost:3000/comments
// Test: curl -X DELETE -d "id=1" http://localhost:3000/comments
// Test: curl -X PUT -d "id=1&author=Scott&text=This is my comment" http://localhost:3000/comments
// Test: curl -X GET http://localhost:3000/comments

// Load modules
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

// Use middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Set port
var port = process.env.PORT || 3000;

// Set static files
app.use(express.static(__dirname + '/public'));

// Set routes
app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
    fs.readFile('comments.json', function(err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var comments = JSON.parse(data);
        var newComment = {
            id: Date.now(),
        }; // Adicionar chave de fechamento
