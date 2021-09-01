var express = require('express');
var router = express.Router();
const Mask = require('../models/mask');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({mask: 'maker'});
});

router.get('/masks', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({mask: 'look at all these masks!'});
});

router.post('/add', function(req, res, next) {
  const mask = new Mask({
    name: req.body.name,
    date: new Date(),
    map: req.body.map,
  }).save(err => {
    if (err) return next(err)
  });
  return res.json({message:'added'});
});

module.exports = router;
