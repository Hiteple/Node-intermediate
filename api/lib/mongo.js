const { MongoClient } = require('mongodb');
const { config } = require('../config/index');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  // SINGLETON
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client
          .connect((err) => {
            if (err) {
              return reject(err);
            }
            resolve(this.client.db(this.dbName));
          })
          .then(() => console.log('Connected to DB'));
      });
    }
    return MongoLib.connection;
  }
}

module.exports = MongoLib;
