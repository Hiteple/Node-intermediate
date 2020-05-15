const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index');

// Build the URI
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}${config.dbHost}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  // Generate the instance
  // SINGLETON
  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        // Use connect method to connect to the Server
        this.client.connect((err) => {
          if (err) {
            reject(err);
          } else {
            resolve(this.client.db(this.dbName));
          }
        });
      });
    }
    return MongoLib.connection;
  }

  // Obtain all data
  /**
   *
   * @param collection
   * @param query
   */
  getAll(collection, query) {
    return this.connect().then((db) => {
      return db.collection(collection).find(query).toArray();
    });
  }

  // Obtain one item
  /**
   *
   * @param collection
   * @param id
   */
  get(collection, id) {
    return this.connect().then((db) => {
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  // Create an item
  /**
   *
   * @param collection
   * @param data
   */
  create(collection, data) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId);
  }

  // Update an item
  /**
   *
   * @param collection
   * @param id
   * @param data
   */
  update(collection, id, data) {
    return this.connect()
      .then((db) => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data });
      })
      .then((result) => result.upsertedId || id);
  }

  // Delete an item
  /**
   *
   * @param collection
   * @param id
   */
  delete(collection, id) {
    return this.connect()
      .then((db) => {
        return db.collection(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id);
  }
}

module.exports = MongoLib;
