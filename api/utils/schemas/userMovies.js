const joi = require('@hapi/joi');

const { movieIdSchema } = require('./movieSchema');
const { userIdSchema } = require('./userSchema');

const userMovieIdSchema = joi.string().regex(/[0-9a-fA-F]{24}$/);
const createUserMovieSchema = {
  userId: userIdSchema,
  movieId: movieIdSchema,
};

module.exports = { userMovieIdSchema, createUserMovieSchema };
