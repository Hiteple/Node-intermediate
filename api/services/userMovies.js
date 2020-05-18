const MongoLib = require('../lib/mongo');

class UserMoviesService {
  constructor() {
    this.collection = 'user-movies';
    this.mongoDB = new MongoLib();
  }

  /**
   *
   * @param userId
   * @returns {Promise<*|*[]>}
   */
  async getUserMovies({ userId }) {
    const query = userId && { userId };
    const userMovies = await this.mongoDB.getAll(this.collection, query);

    return userMovies || [];
  }

  /**
   *
   * @param userMovie
   * @returns {Promise<void>}
   */
  async createUserMovie({ userMovie }) {
    return await this.mongoDB.create(this.collection, userMovie);
  }

  /**
   *
   * @param userMovieId
   * @returns {Promise<void>}
   */
  async deleteUserMovie({ userMovieId }) {
    return await this.mongoDB.delete(this.collection, userMovieId);
  }
}

module.exports = UserMoviesService;
