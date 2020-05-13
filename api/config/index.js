require('dotenv').config();

// Best practice is making a config object with env variables
const config = {
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 3000,
};

module.exports = { config };
