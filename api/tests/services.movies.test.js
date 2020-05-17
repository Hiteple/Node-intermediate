const assert = require('assert');
const proxyQuire = require('proxyquire');

const { MongoLibMock, getAllStubs } = require('../utils/mocks/mongoLib');

const { moviesMock } = require('../utils/mocks/movies-mock');

describe('services - movies', function () {
  const MoviesServices = proxyQuire.load('../services/movies', {
    '../lib/mongo': MongoLibMock,
  });

  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async function () {
    it('should call the get all MongoLib method', async function () {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStubs.called, true);
    });

    it('should return an array of movies', async function () {
      const result = await moviesService.getMovies({});
      assert.notStrictEqual(result, moviesMock);
    });
  });
});
