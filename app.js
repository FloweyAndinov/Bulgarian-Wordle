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



fs.createReadStream('cities.csv')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    for (let i=0; i<results.length; i++) {
        let city = results[i].GRAD;
        if (city.length==width) {
            words.push(city);
  
            
        }
      }
      getWord()
  });





  function getWord() {
    let index = Math.floor(Math.random() * words.length)
    word = words[index]
     console.log(word)
  }
  


  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });


  app.use(favicon('favicon.ico')); 
   app.use(express.static(__dirname));
  

app.get('/request' , (req , res) => {
    console.log("requested");
    res.status(200).json({message : word});

})

app.get('/' , (req , res) => {
    console.log("requested");
    res.sendFile(__dirname + '/index.html')

})