const express = require('express');

const UserMoviesService = require('../services/userMovies');
const { validationHandler } = require('../utils/middlewares/validationHandler');

const { movieIdSchema } = require('../utils/schemas/movieSchema');
const { userIdSchema } = require('../utils/schemas/userMovies');
const { createUserMovieSchema } = require('../utils/schemas/userMovies');

function userMoviesApi(app) {
  const router = express.Router();
  app.use('/api/user-movies', router);

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

  router.post('/', validationHandler(createUserMovieSchema), async function (
    req,
    res,
    next
  ) {
    const { body: userMovie } = req.body;
    try {
      const createdUserMovieId = await userMoviesService.createUserMovie({
        userMovie,
      });
      return res.status(201).json({
        data: createdUserMovieId,
        message: 'User movie created!',
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete(
    '/:userMovieId',
    validationHandler({ userMovieId: movieIdSchema }, 'params'),
    async function (req, res, next) {
      const { userMovieId } = req.params;
      try {
        const deletedUserMovieId = await userMoviesService.deleteUserMovie(
          userMovieId
        );
        return res.status(200).json({
          data: deletedUserMovieId,
          message: 'User movie deleted!',
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = { userMoviesApi };
