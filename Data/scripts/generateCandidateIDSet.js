
let candidates = require('./candidates.json');
let conCom = require('./contributionCommittee.json');

let candidateIDSet = new Set();
candidates.forEach(element => {
  candidateIDSet.add(element.CAND_ID)
});
console.log(candidateIDSet)

