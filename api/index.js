const express = require('express');
const app = express();

const { config } = require('./config/index');

// Api
const { authApi } = require('./routes/auth');
const { moviesApi } = require('./routes/movies');
const { userMoviesApi } = require('./routes/userMovies');

// To capture 404 error
const { notFoundHandler } = require('./utils/middlewares/notFoundHandler');

// Middleware section
const {
  logErrors,
  wrapErrors,
  errorHandler,
} = require('./utils/middlewares/errorHandler');

// body parser middleware
app.use(express.json());

// Passing app to the route
authApi(app);
moviesApi(app);
userMoviesApi(app);

// 404
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
