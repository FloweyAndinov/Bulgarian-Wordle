var height = 6; //guesses
var width = 5; //word length

var row = 0; //current attempt
var col = 0; // current letter

var gameOver = false;

var word = "";


let result = fetch('/request', {
    method: 'GET'
})
   .then(response => response.json())
   .then(response => word=response.message.toUpperCase())
//    .then(response => console.log(word))



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

    document.addEventListener("keypress", addLetter);
    document.addEventListener("keyup", changeOrSubmit);

    window.addEventListener('blur', function() {
        let elements = document.getElementsByTagName("span")
        for (let i=0; i<elements.length; i++) {
            elements[i].className += "_blur";
        }
      });
      
      window.addEventListener('focus', function() {
        let boxes = document.querySelectorAll(".tile_blur");

        boxes.forEach(box => {
            box.className = "tile";
        });
      });
}

function addLetter(e) {
    
 if (gameOver) return;
 var charCode = (typeof e.which == "number") ? e.which : e.keyCode;
 var typedChar = String.fromCharCode(charCode);

// console.log(typedChar);

    const cyrillicPattern = /^[\u0400-\u04FF]+$/;

 if (cyrillicPattern.test(typedChar)) {
    if(col < width) {
        let currentTile = document.getElementById (row.toString() + " - " + col.toString());
        if(currentTile.innerText == "") {
            // console.log("added");
            currentTile.innerText = typedChar.toUpperCase();
            col +=1;
        }
    }
   
   
 }  
    else if (/^[0-9a-z]+$/.test(typedChar) || /^[0-9A-Z]+$/.test(typedChar)) // check if char is alphanumeric
     {
    shakeText(row);
     }
}

function changeOrSubmit(e) {
    if (e.code=="Backspace") {

        let currentTile = document.getElementById (row.toString() + " - " + (col-1).toString());
        // console.log(row + " " + col);
        if (col>0) {
            if(currentTile.innerText != "") {
                currentTile.innerText = "";
                col -=1;
            }
        }
     }
      if (e.code == "Enter") {
    
        if (col<width) {
            shakeText(row);
            return;
        }
    
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
}


function startNextAttempt() {
    if (col==width) {
        // console.log(row + " " + height);
        if (row<height-1) {
            row++;
            col = 0;
        }
        else {
            // console.log("word show")
            showWord();
        }
    }
}

function showWord() {
    gameOver = true;

    document.getElementById("answer").innerText = word;
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


function shakeText(row) {
for (let i=0; i<width; i++) {
    let currentTile = document.getElementById (row.toString() + " - " + i.toString());
    currentTile.classList.add("shake");

    setTimeout(() => {
        currentTile.classList.remove("shake");
    }, 500);
}
}