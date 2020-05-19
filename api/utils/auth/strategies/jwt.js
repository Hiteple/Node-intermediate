const passport = require('passport');
const { JwtStrategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config: authJwtToken } = require('../../../config/index');

// implementing JWT Strategy
passport.use(
  'jwt-strategy',
  new JwtStrategy(
    {
      secretOrKey: authJwtToken,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async function (tokenPayload, done) {
      const usersService = new UsersService();

      try {
        const user = await usersService.getUser({ email: tokenPayload.email });

        // Check if user is retrieved
        if (!user) {
          return done(boom.unauthorized(), false);
        }

        delete user.password;

        // Return User and the token payload
        done(null, { ...user, scopes: tokenPayload });
      } catch (err) {
        done(err);
      }
    }
  )
);
