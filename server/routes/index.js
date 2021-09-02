//do a get with colXrow, then when scroll to bottom, fetch another colXrow

var express = require('express');
var router = express.Router();
const Mask = require('../models/mask');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({mask: 'maker'});
});

router.get('/masks/all', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Mask.find()
      .exec(function(err, masks) {
        if (err) {return next(err);}
        if (masks==null) {
          var err = new Error('No masks found!');
          err.status = 404;
          return next(err);
        }
        return res.json(masks);
      })
});

router.get('/masks/:skip', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let skip = parseInt(req.params.skip);
  Mask.findOne().skip(skip)
      .exec(function(err, mask) {
        if (err) {return next(err);}
        if (mask==null) {
          var err = new Error('No mask found!');
          err.status = 404;
          return next(err);
        }
        return res.json(mask);
      })
});

router.get('/count', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  Mask.count()
      .exec(function(err, count) {
        if (err) {return next(err);}
        if (count==null) {
          var err = new Error('No count found!');
          err.status = 404;
          return next(err);
        }
        return res.json(count);
      })
  // res.json({mask: 'look at all these masks!'});
});

router.post('/add', function(req, res, next) {
  // let no = Mask.countDocuments();
  const mask = new Mask({
    // no: req.body.no,
    name: req.body.name,
    date: new Date(),
    map: req.body.map,
  }).save(err => {
    if (err) return next(err)
  });
  return res.json({message:'added'});
});

router.post('/masks/update/:id', function(req, res, next) {
  // let no = Mask.countDocuments();
  Mask.findByIdAndUpdate(req.params.id, {name:req.body.name,map:req.body.map}, function(err,result) {
        if (err) {return next(err);}
        return res.json({message:'updated'});
      });


  // const mask = new Mask({
  //   // no: req.body.no,
  //   name: req.body.name,
  //   date: new Date(),
  //   map: req.body.map,
  // }).save(err => {
  //   if (err) return next(err)
  // });

});

module.exports = router;
