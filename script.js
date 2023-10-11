var height = 6; //guesses
var width = 5; //word length

var row = 0; //current attempt
var col = 0; // current letter

var gameOver = false;
const csv = require('csv-parser');
const fs = require('fs');
const results = [];
var words = [];
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
  });

  
  

var index = Math.floor(Math.random() * words.length);
var word = words[index];


window.onload = function() {
    initialize();
}

function initialize () {
    //Create board
    for (let r=0; r<height; r++) {
        for (let c=0; c<width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + " - " + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    document.addEventListener("keyup", addLetter);
}

function addLetter(e) {
 if (gameOver) return;
//   alert(e.code);
 if ("KeyA" <= e.code && e.code <="KeyZ") {
    if(col < width) {
        let currentTile = document.getElementById (row.toString() + " - " + col.toString());
        if(currentTile.innerText == "") {
            console.log("added");
            currentTile.innerText = e.code[3];
            col +=1;
        }
    }
   
 }
 if (e.code=="Backspace") {

    let currentTile = document.getElementById (row.toString() + " - " + (col-1).toString());

    if (col>0) {
        if(currentTile.innerText != "") {
            currentTile.innerText = "";
            col -=1;
        }
    }
 }
 if (e.code == "Enter") {

    if (col<width)
    return;

    let attemptedWord = "";
    for (let c=0; c<width; c++) {
        let currentTile = document.getElementById (row.toString() + " - " + c.toString());
        attemptedWord +=currentTile.innerText;
        colorLetters(currentTile,currentTile.innerText,c);
    }
    if (word==attemptedWord) {
        showWord();
    }
    if (!gameOver) {
        startNextAttempt();
    }
    
}

function startNextAttempt() {
    if (col==width) {
        if (row<height) {
            row++;
            col = 0;
        }
        else {
            gameOver = true;
            showWord();
        }
    }
}

function showWord() {
    console.log(word);
}

function colorLetters(tile,letter,index) {
    // console.log(tile.innerText)
    // console.log(letter)
    // console.log(index)
if (word[index]==letter) {
    tile.classList.add("correct");
}
else if (word.includes(letter)) {
    tile.classList.add("present")
}
else {
    tile.classList.add("absent")
}
}
 
}