//create web server
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');
var comments = [];

//use the body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//load comments
fs.readFile(commentsPath, {encoding: 'utf8'}, function(err, data) {
  if (err) {
    console.log(err);
  } else {
    comments = JSON.parse(data);
  }
});

//get comments
app.get('/api/comments', function(req, res) {
  res.json(comments);
});

//add comments
app.post('/api/comments', function(req, res) {
  var comment = {
    id: Date.now(),
