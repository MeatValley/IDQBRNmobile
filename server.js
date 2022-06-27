var express = require('express');
const cors = require('cors');
var app = express();
app.use(cors);
var mysql = require('mysql2');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));

var con = mysql.createConnection({
    host:'127.0.0.1',
    user: 'diseasesmapadmin',
    password: 'diseasesmap',
    database: 'diseasesmapdb'
})
var portN = 4556
var server = app.listen(portN, function(){
    var host = server.address().address
    var port = server.address().port
})

con.connect(function(error){
    if(error) console.log(error);
    else console.log('server is listening on port ' + portN);
})

app.get('/users', function(req,res){
    con.query('SELECT * FROM diseasesmapdb.server_usuarios;', function(error, rows, fields){
        if(error) console.log(error);
        else{
            console.log(rows);
            res.send(rows)
        }
    })})