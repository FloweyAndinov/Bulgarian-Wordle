var height = 6; //guesses
var width = 5; //word length

var row = 0; //current attempt
var col = 0; // current letter

var gameOver = false;
var words = ["SQUID","APPLE"]
var index = Math.random() * words.length;
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
        console.log(currentTile)
        if(currentTile.innerText == "") {
            console.log("added");
            currentTile.innerText = e.code[3];
            col +=1;
        }
    }
   
 }
 if (e.code == "Enter") {
    console.log(col.toString());
    console.log(width.toString())
    if (col==width) {
        console.log(row.toString());
        console.log(height.toString())
        if (row<height) {
            console.log("this")
            row++;
            col = 0;
        }
    }
}
 
}