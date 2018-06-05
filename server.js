var express = require('express');
var bodyParser = require('body-parser');
var path =require('path');
var app = express();

var PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require(path.join(__dirname, './app/routing/apiRoutes.js'))(app);
require(path.join(__dirname, './app/routing/htmlRoutes.js'))(app);
 


app.listen(PORT, function(){
    console.log('Server listening on: http://localhost:' + PORT);
});

