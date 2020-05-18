const express = require('express');

const UserMoviesService = require('../services/userMovies');
const { validationHandler } = require('../utils/middlewares/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movieSchema');
const { userIdSchema } = require('../utils/schemas/userMovies');
const { createUserSchema } = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
  const router = express.Router();
  app.user('/api/user-movies', router);

  const userMoviesService = new UserMoviesService();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async function (req, res, next) {
      const { userId } = req.query;

      try {
        const userMovies = await userMoviesService.getUserMovies({ userId });

        return res.status(200).json({
          data: userMovies,
          message: 'User movies listed!',
        });
      } catch (error) {
        next(error);
      }
    }
  );
}
