const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;
// const auth = require('../auth')
User = require('../models/User');
Mask = require('../models/Mask');
//@route    GET api/auth
//@desc     Get logged in user
//@access   Private
router.get('/', (req,res) => {
  res.json({message: 'Welcome to protection'});

});

const passport = require('passport');

const jwtStrategy  = require("../middleware/jwt");
passport.use(jwtStrategy);


router.post('/signup', async (req, res, next) => {
  // const { email, password } = req.body;
  //
  // // authentication will take approximately 13 seconds
  // // https://pthree.org/wp-content/uploads/2016/06/bcrypt.png
  // const hashCost = 10;
  //
  // try {
  //   const passwordHash = await bcrypt.hash(password, hashCost);
  //   const userDocument = new User({ email, passwordHash });
  //   await userDocument.save();
  //
  //   res.status(200).send({ email });
  //
  // } catch (error) {
  //   res.status(400).send({
  //     error: 'req body should take the form { email, password }',
  //     details: [email, password]
  //   });
  // }
  bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if (err) return next(err)
            else {
              const user = new User({
                email: req.body.email,
                password: hashedPassword,
                // joined: req.body.joined//2021-08-05T00:00:00.000+00:00
              }).save(err => {
                if (err) {return next(err)}
                // res.redirect('user/' + req.body.username);
                res.render('welcome', {title: req.body.username, username: req.body.username});

              })
            };
          });
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    let user = await User.findOne({ email });

    //This lookup would normally be done using a database
    if (user) {
        // bcrypt.compare.then((res)=>{
        //   if (res) { //the password compare would normally be done using bcrypt.
        //     return done(null,user)
        //   }
        // })
        const match = await bcrypt.compare(password, user.password);

        if (match) { //the password compare would normally be done using bcrypt.
          const opts = {}
            opts.expiresIn = 120;  //token expires in 2min
            const secret = JWTsecret //normally stored in process.env.secret
            const token = jwt.sign({ email }, secret, opts);
            return res.status(200).json({
                message: "Auth Passed",
                token
            })
        }
      // if ()


    }
    return res.status(401).json({ message: "Auth Failed" })

});

router.get("/get", passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).send("YAY! this is a protected GET Route")
})


router.post('/update/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {
  // let no = Mask.countDocuments();
  Mask.findByIdAndUpdate(req.params.id, {name:req.body.name,map:req.body.map}, function(err,result) {
        if (err) {return next(err);} else {
          return res.json({message:'mask updated'})
        };
      });
});

router.post('/delete/:id', passport.authenticate('jwt', { session: false }), function(req, res, next) {

  Mask.findByIdAndRemove(req.params.id, function deleteMask(err) {
      if (err) {return next(err);}
      return res.json({message:'mask deleted.'});
    });
});



module.exports = router;
