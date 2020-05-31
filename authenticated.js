var passport=require("passport");
var localstrategy=require("passport-local").Strategy
var user=require("./models/user");


passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());