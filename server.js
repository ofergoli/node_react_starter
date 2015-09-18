process.env.NODE_ENV  =  process.env.NODE_ENV  || 'development';
process.env.PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');
var express = require('express');

var app = express();

app.use(express.static('./dist'));

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 

app.listen(process.env.PORT );

process.on('uncaughtException', function (err) {
	console.log('process.on.uncaughtException Caught exception: ' + err);
});


