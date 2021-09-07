const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

require('dotenv').config()
const JWTsecret = process.env.JWT_SECRET;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWTsecret; 

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {

    if (jwt_payload) {
        return done(null, true)
    }
    return done(null, false)
})
