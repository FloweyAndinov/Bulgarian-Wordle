var height = 6; //guesses
var width = 5; //word length

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
      console.log(words);
  });