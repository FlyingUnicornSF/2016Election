//const router = require('express').Router();
const fs = require('fs');
const readline = require('readline');

let lineReader = readline.createInterface({
  input: fs.createReadStream('./cm.txt', {
    encoding: 'utf8'
  })
});

lineReader.on('line', function (line) {
  console.log('Line from file:', line);
});