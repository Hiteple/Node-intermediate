const express = require('express');
const app = express();

const { config } = require('./config/index');
const { moviesApi } = require('./routes/movies');

// Middleware section
const { logErrors, errorHandler } = require('./utils/middlewares/errorHandler');
// body parser middleware
app.use(express.json());

// Passing app to the route
moviesApi(app);

// Other middleware
app.use(logErrors);
app.use(errorHandler);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
