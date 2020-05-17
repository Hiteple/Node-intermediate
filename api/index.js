const express = require('express');
const app = express();

const { config } = require('./config/index');
const { moviesApi } = require('./routes/movies');

// To capture 404 error
const notFoundHandler = require('./utils/middlewares/notFoundHandler').notFoundHandler;

// Middleware section
const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandler');
// body parser middleware
app.use(express.json());

// Passing app to the route
moviesApi(app);
app.use(notFoundHandler);

// Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
