"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var UserModel_1 = require("../Models/UserModel");
var FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails']
}, function (accessToken, refreshToken, profile, done) {
    UserModel_1.default.findOne({ 'id': profile.id }, function (err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, user);
        }
        else {
            var newUser = new UserModel_1.default();
            newUser.id = profile.id;
            newUser.token = accessToken;
            newUser.userName = profile._json.name;
            newUser.email = profile.emails[0].value;
            newUser.save(function (err) {
                if (err) {
                    throw err;
                }
                return done(null, newUser);
            });
        }
    });
}));
passport.serializeUser(function (user, done) {
    done(null, user._id);
});
passport.deserializeUser(function (id, done) {
    UserModel_1.default.findById(id, function (err, user) {
        done(err, user);
    });
});
