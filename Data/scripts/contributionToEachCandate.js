const fs = require('fs');
const candidates = require('../candidates.json');
// let contribution = require('../contributionCommittee.json');
const contribution = require('../itpas2.json');
const committees = require('../committee.json');

/**
 * Create map, candidateIDMap, to map candidate name to candidate ID.
 */
let candidateIDMap = new Map();
candidates.forEach(element => {
  candidateIDMap.set(element.CAND_ID, element.CAND_NAME)
});

/**
 * Create map, commiteeIDMap, to map commitee name to commitee ID.
 */
let committeeIDMap = new Map();
committees.forEach(element => {
  committeeIDMap.set(element.CMTE_ID, element.CMTE_NM)
});

/**
 * Create contributionTotals object that maps total amount of contribution to each candidate
 */
let contributionTotals = {};
contribution.forEach(element=>{
  // Extract loop variables.
  let candidateID = element.CAND_ID;
  let committeeID = element.CMTE_ID;
  let transAmount = parseInt(element.TRANSACTION_AMT);
  
  // Setup inital canidate state. 
  if(contributionTotals[candidateID] === undefined){
    contributionTotals[candidateID] = {
      "candidateID": candidateID,
      "name": candidateIDMap.get(candidateID),
      "totalContributionAmount": 0,
      "committees": {}
    };
  }
  let candidate = contributionTotals[candidateID]
  candidate["totalContributionAmount"] += transAmount;

  // Setup initial committe state.
  if(candidate["committees"][committeeID] === undefined){
    candidate["committees"][committeeID] = {
      "committeeID" : committeeID,
      "name" : committeeIDMap.get(committeeID),
      "totalContributionAmount": 0,
    };
  }
  let committee = candidate["committees"][committeeID];
  committee["totalContributionAmount"] += transAmount;
});

console.log(contributionTotals);

let contributionPerCandidate = [];
for (candidateID in contributionTotals) {
  let candidate = contributionTotals[candidateID];
  candidate["committees"] = Object.values(candidate["committees"]);
  contributionPerCandidate.push(candidate)
}

/**
 *  Write contribution per candidate map to contributionToCandidates json file. 
 */
fs.writeFile('../contributionToCandidates.json', JSON.stringify(contributionPerCandidate, null, 2), 'utf8', (err) => {
  if (err) throw err;
});

// How many Filer Identification Numbers
// let contributionIDSet = new Set();
// contribution.forEach(element=>{
//   if(!contributionIDSet.has(element.CMTE_ID)){
//     contributionIDSet.add(element.CMTE_ID);
//   }
// })
// console.log(contributionIDSet.size)