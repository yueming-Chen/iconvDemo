var express = require('express');
var path = require('path');
var app = express();
var Api = require('./routes/Api');

app.use('/Api', Api);
app.use(express.static(path.join(__dirname, 'www')));
var port = 3067;

app.listen(port,function(){
	console.log(port);
});
