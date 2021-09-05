// const jwt = require('jsonwebtoken');
// require('dotenv').config()
// const JWTsecret = process.env.JWT_SECRET;
// module.exports = function(req,res,next){
//   //Get token from request header
//   const token = req.header('x-auth-token');
//   if(!token){
//       return res.status(401).json({msg:'No token, auth failed'});
//   }
//   try {
//       //verify token & extract payload
//       const decoded = jwt.verify(token,JWTsecret);
//       req.user = decoded.user;
//       next();
//   } catch (err) {
//       res.status(401).json({msg: 'Token is invalid'});
//   }
// }
