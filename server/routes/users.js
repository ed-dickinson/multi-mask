// User = require('../models/user');
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/new', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/emails', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  User.find()
    .select('email -_id')
    .exec(function(err, emails) {
      if (err) {return next(err);}
      if (emails==null) {
        var err = new Error('No emails found!');
        err.status = 404;
        return next(err);
      }
      return res.json(emails);
    })
});

module.exports = router;
