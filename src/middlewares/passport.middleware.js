const passport = require('passport');
const { Strategy } = require('passport-google-oauth2');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pinoLogger = require('../../logger');

const { User } = require('../models/users.model');

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env;

const googleParams = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
  passReqToCallback: true,
};

const googleCallback = async (
  req,
  accessToken,
  refreshToken,
  profile,
  done
) => {
  try {
    const { email, displayName } = profile;
    const user = await User.findOne({ email });
    if (user) {
      pinoLogger.error(`${email} is already used`);
      return done(null, user);
    }
    const hashPassword = await bcrypt.hash(uuidv4(), 10);
    const newUser = await User.create({
      email,
      name: displayName,
      password: hashPassword,
    });
    done(null, newUser);
    pinoLogger.info('User was logged in successfully with Google');
  } catch (error) {
    done(error);
    pinoLogger.error(error);
  }
};

const googleStrategy = new Strategy(googleParams, googleCallback);

passport.use('google', googleStrategy);

module.exports = passport;
