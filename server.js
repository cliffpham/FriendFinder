var express = require('express');
var bodyParser = require('body-parser');
var path =require('path');
var app = express();

var PORT = 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
var cryptids = require('./data.js');
var userdataArray = [];


// look in directory for file and render it

app.get("/", function(req,res){
    res.status(200).sendFile(path.join(__dirname, '/index.html'));
    
});

// app.get("/test", function(req,res){
//     res.status(200).sendFile(path.join(__dirname, '/index.html'));
    
// });


app.get("/survey", function(req,res){
    res.status(200).sendFile(path.join(__dirname, '/survey.html'));
});

app.get("/api/list", function(req,res){
    res.json(userdataArray);
});

// take the contents of submission and use middleware aka 'body parser allows for res.body' to parse and console log it
 
app.post('/survey',function(req,res){
    var userInput = req.body;
    console.log(userInput);
    // console.log(userInput.answers);
    var userResponse = userInput.answers;

    var matchName = '';
    var matchImage = '';
    var totalDifference = 1000; //number gets replaced during comparison, starting with a large number

    for (var i = 0; i < cryptids.length; i++){
        // console.log(cryptids[i].answers);
        var diff = 0;

        // console.log(cryptids[i].answers);
        
    for(var j=0; j < userResponse.length; j++) {

        
        // Math.abs does not differentiate between positive and negativew integers
        diff += Math.abs(cryptids[i].answers[j] - userResponse[j]);     
      
        }
  
        console.log('diff = ' + diff);

        // loop through all differences until smallest integer is found

        if (diff < totalDifference) {
            console.log('Closest match = ' + diff);
            console.log('Friend name = ' + cryptids[i].name);
            console.log('Friend image = ' + cryptids[i].photo);

            totalDifference = diff;
            matchName = cryptids[i].name;
            matchImage = cryptids[i].photo;
        }

    }
    // add to list of friends
    userdataArray.push(userInput);
   

    //send the data in a presentable way to create dynamic html
    res.json({status: 'OK', matchName: matchName, matchImage: matchImage});
});

app.listen(PORT, function(){
    console.log('Server listening on: http://localhost:' + PORT);
});

