var height = 6; //guesses
var width = 5; //word length

const https = require('https');
const express = require('express');
const app = express()
const csv = require('csv-parser');
var favicon = require('serve-favicon');
var path = require('path');
const fs = require('fs');
const results = [];
let words = [];
let word = ""



fs.createReadStream(path.resolve('BW-BackEnd/cities.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for (let i=0; i<results.length; i++) {
        let city = results[i].GRAD;
          if (city.length==width) {
            words.push(city);
          }
      }
       getWord() //first call
  });





function getWord() {
    let index = Math.floor(Math.random() * words.length)
    word = words[index]
     console.log(word)
  }

  
  var seconds = 30;
  var milliseconds = seconds * 1000;
  var lastIndex = 0;

  //change the word every *seconds* seconds
  setInterval(function() {
    let index = Math.floor(Math.random() * words.length)
    if (lastIndex==index) {
      index = Math.floor(Math.random() * words.length)
    }
    lastIndex=index
      word = words[index]
       console.log("Changed to " + word)
  }, milliseconds);
  

  //open port
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  //load favicon
  app.use(favicon('./BW-FrontEnd/favicon.ico')); 
  app.use(express.static(path.resolve('./BW-FrontEnd/')));
  

// send the word as response
app.get('/request' , (req , res) => {
    //console.log("requested");
    res.status(200).json({message : word});

})

// render webpage (this doesn't run if html file is index.html)
app.get('/' , (req , res) => {
    console.log("requested");
    // getWord() // change word with each refresh
    res.sendFile(path.resolve('./BW-FrontEnd/index.html'))

})