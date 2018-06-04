var express = require('express');
var bodyParser = require('body-parser');
var path =require('path');
var app = express();

var PORT = 3000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
var friendArray = [
    {
        name: 'Bigfoot',
        photo: 'https://media.giphy.com/media/l1KdcZQd7LhIjz2Q8/giphy.gif',
        answers: [
            '1',
            '2',
            '5'
        ]},
        {name: 'Nessie',
        photo: 'https://media.giphy.com/media/3xz2BYdD9uuttbYuWc/giphy.gif',
        answers: [
            '1',
            '1',
            '1'
        ]},
        {name: 'Jersey Devil',
        photo: 'https://media.giphy.com/media/vvWKmZhu0vDnlxQTRj/giphy.gif',
        answers: [
            '3',
            '2',
            '3'
        ]},
        {name: 'Jackalope',
        photo: 'https://media.giphy.com/media/26FxMw9e4UG4pGja8/giphy.gif',
        answers: [
            '5',
            '5',
            '4'
        ]}

];

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

    for (var i = 0; i < friendArray.length; i++){
        // console.log(friendArray[i].answers);
        var diff = 0;

        // console.log(friendArray[i].answers);
        
    for(var j=0; j < userResponse.length; j++) {

        
        // Math.abs does not differentiate between positive and negativew integers
        diff += Math.abs(friendArray[i].answers[j] - userResponse[j]);     
      
        }
  
        console.log('diff = ' + diff);

        // loop through all differences until smallest integer is found

        if (diff < totalDifference) {
            console.log('Closest match = ' + diff);
            console.log('Friend name = ' + friendArray[i].name);
            console.log('Friend image = ' + friendArray[i].photo);

            totalDifference = diff;
            matchName = friendArray[i].name;
            matchImage = friendArray[i].photo;
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

