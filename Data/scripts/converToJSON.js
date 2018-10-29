const fs = require('fs');
const readline = require('readline');
let candidates = require('../Data/candidates.json');

let candidateIDSet = new Set();
candidates.forEach(element => {
  candidateIDSet.add(element.CAND_ID)
});

let lineReader = readline.createInterface({
  input: fs.createReadStream('./itpas2.txt', {
    encoding: 'utf8'
  })
});

// lineReader.on('line', function (line) {
//   console.log('Line from file:', line);
// });

let wtStream = fs.createWriteStream('./itpas2.json');
// let wtStreamJson = fs.createWriteStream('./itpas2.json');

lineReader.on('line', (line)=>{
  // console.log('Line from file:', line)
  let lineArray = line.split('|')
  if(candidateIDSet.has(lineArray[16])){
    let contributionObj = {};
    contributionObj = {
      "CMTE_ID": lineArray[0],
      "AMNDT_IND": lineArray[1],
      "RPT_TP": lineArray[2],
      "TRANSACTION_PGI": lineArray[3],
      "IMAGE_NUM": lineArray[4],
      "TRANSACTION_TP": lineArray[5],
      "ENTITY_TP": lineArray[6],
      "NAME": lineArray[7],
      "CITY": lineArray[8],
      "STATE": lineArray[9],
      "ZIP_CODE": lineArray[10],
      "EMPLOYER": lineArray[11],
      "OCCUPATION": lineArray[12],
      "TRANSACTION_DT": lineArray[13],
      "TRANSACTION_AMT": lineArray[14],
      "OTHER_ID": lineArray[15],
      "CAND_ID": lineArray[16],
      "TRAN_ID": lineArray[17],
      "FILE_NUM": lineArray[18],
      "MEMO_CD": lineArray[19],
      "MEMO_TEXT": lineArray[20],
      "SUB_ID": lineArray[21]
    }
    // wtStream.write(lineArray.join(','), (err)=>{
    wtStream.write(JSON.stringify(contributionObj), (err)=>{
      if(err){ console.log(err) }
    });
    wtStream.write(","+'\n')
  };
});

