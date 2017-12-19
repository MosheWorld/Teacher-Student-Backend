import * as passport from 'passport';

import UserDB from '../Models/UserModel';

const FacebookStrategy = require('passport-facebook').Strategy;

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails']
},
    (accessToken, refreshToken, profile, done) => {
        UserDB.findOne({ 'id': profile.id }, (err, user) => {
            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, user);
            } else {
                var newUser = new UserDB();

                newUser.id = profile.id;
                newUser.token = accessToken;
                newUser.userName = profile._json.name;
                newUser.email = profile.emails[0].value;

                newUser.save((err) => {
                    if (err) {
                        throw err;
                    }

                    return done(null, newUser);
                });
            }
        });
    }
));

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UserDB.findById(id, (err, user) => {
        done(err, user);
    });
});