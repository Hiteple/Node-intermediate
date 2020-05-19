const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const ApiKeysService = require('../services/apiKeys');
const { config: authJwtSecret } = require('../config/index');
require('../utils/auth/strategies/basic');

// Basic Strategy
function authApi(app) {
  const router = express.Router();
  app.use('/api/auth', router);

  const apiKeysService = new ApiKeysService();

  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;

    if (!apiKeyToken) {
      next(boom.unauthorized('Api token is required'));
    }

    passport.authenticate(
      'basic',
      function (error, user) {
        try {
          if (error || !user) {
            next(boom.unauthorized());
          }

          req.login(user, { session: false }, async function (err) {
            if (error) {
              next(err);
            }
            const apiKey = await apiKeysService.getApiKey({
              token: apiKeyToken,
            });

            if (!apiKeyToken) {
              next(boom.unauthorized());
            }
            const { _id: id, name, email } = user;
            const payload = {
              sub: id,
              name,
              email,
              scopes: apiKey.scopes,
            };
            const token = jwt.sign(payload, `${authJwtSecret}`, {
              expiresIn: '15m',
            });
            return res.status(200).json({
              token,
              user: { id, name, email },
            });
          });
        } catch (err) {
          next(err);
        }
      },
      () => console.log('Token obtained')
    )(req, res, next);
  });
}

module.exports = { authApi };
