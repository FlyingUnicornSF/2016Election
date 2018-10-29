const router = require('express').Router();
const _ = require('underscore');
const candidates = require('../Data/candidates.json');
//const contribution = require('../Data/itpas2.json');
const contributions = require('../Data/contributionToCandidates.json'); 

/**
 * Enables CORS (Cross-Origin Resource Sharing)
 * https://enable-cors.org/server_expressjs.html
 */
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// If no API routes are hit, send the React app
router.get('/', function (req, res) {
  res.sendFile('index.html', { root: '../client/public/' });
});


router.get('/candidates', function (req, res) {
  res.send(candidates);
});

router.get('/candidates/:name', function (req, res) {
  res.send(_.findWhere(candidates, { CAND_NAME: req.params.name }));
});

router.get('/contribution', function (req, res) {
  let data = _.map(contributions, (candidate) => {
    return {
      candidateID : candidate.candidateID,
      name : candidate.name,
      totalContributionAmount : candidate.totalContributionAmount,
    };
  })
  data = _.sortBy(data, "totalContributionAmount").reverse()
  res.send(data);
});

router.get('/contribution/:id', function (req, res) {
  let candidate = _.findWhere(contributions, { candidateID : req.params.id })
  let data = candidate["committees"];
  data =  _.sortBy(data, "totalContributionAmount").reverse();
  res.send(data);
});

module.exports = router;