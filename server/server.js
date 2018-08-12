var express = require('express');
var webpack = require('webpack');
var path = require('path');
var app = new express();
var bodyParser = require('body-parser');
var routes = require('./routes');
var config = require('../webpack.config');

//mongoose.connect('mongodb://127.0.0.1:27017/product_app');
var mysql = require("mysql");
var connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'admin',
  database: 'testdb'
});

connection.connect(function(error) {
  if(!!error) {
    console.log('error');
  } else {
    console.log('MYSQL connected');
  }
});

app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//app.use('/api', routes);

app.get('/getdata' , function(req, res) {
  connection.query("Insert into student (studentName, studentRoll, studentClass, studentAddr, language ) values ('Samuel', 'G004', '4TH007', 'California', 'English') ", function(error, irows, ifields){
     if(!!error) {
       console.log("error", error.message);
     } else {
       connection.query("Select * from student", function(err, srows, sfields){
         res.send({status : true, data : srows});
       })
     }
    })
});

app.get('/' , function(req, res) {
    res.sendFile(path.resolve(__dirname, '../src/index.html'))
})

app.listen(8000, function(err, response) {
    if(err)
        throw err;
    else
        console.log('Application is running at port 8000')
})
