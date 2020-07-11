var passport=require("passport");
var localstrategy=require("passport-local").Strategy
var User=require("./models/user");
var JwtStrategy=require("passport-jwt").Strategy;
var ExtractJwt=require("passport-jwt").ExtractJwt;
var jwt=require("jsonwebtoken");
var config=require("./config.js")

passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken=function(user)
{
    return jwt.sign(user,config.secretKey,{expiresIn:3600});
}
var opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;
exports.jwtpassport=passport.use(new JwtStrategy(opts,(jwt_payload,done)=>
{
    User.findOne({_id:jwt_payload._id},(err,user)=>
    {
        if(err)
        {
            return done(err,false);
        }
        else if(user)
        {
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    })
}))


exports.verifyuser=passport.authenticate("jwt",{session:false})