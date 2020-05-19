const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const UsersService = require('../../../services/users');

// Basic Strategy
passport.use(
  'basic',
  new BasicStrategy(
    async function (email, password, done) {
      const userServices = new UsersService();

      try {
        const user = await userServices.getUser({ email });

        // Verification
        if (!user) {
          return done(boom.unauthorized(), false);
        }
        if (!(await bcrypt.compare(password, user.password))) {
          return done(boom.unauthorized(), false);
        }

        // Removing the password
        delete user.password;
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
    () => console.log('Basic strategy processed')
  )
);
