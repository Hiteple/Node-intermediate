const express = require('express');
const app = express();

const { config } = require('./config/index');
const { moviesApi } = require('./routes/movies');

// body parser middleware
app.use(express.json());

// Passing app to the route
moviesApi(app);

app.listen(config.port, () =>
  console.log(`Server listening on port ${config.port}`)
);
