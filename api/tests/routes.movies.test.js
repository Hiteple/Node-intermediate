const assert = require('assert');

// For Services replacement in execution
const proxyQuire = require('proxyquire');

const { moviesMock, MovieServiceMock } = require('../utils/mocks/movies-mock');
const { testServer } = require('../tests/test-server');

describe('routes - movies', function () {
  // We need to use proxyQuire in the movie routes but we don't need to analyze the MoviesService
  // So, we use the MovieServiceMock defined in test-server for this in proxyQuire method
  const route = () => {
    return proxyQuire.load('../routes/movies', {
      '../services/movies': MovieServiceMock,
    });
  };

  // Finally, we add it to the minimal server for tests and store this to use it in each test
  const request = testServer(route);

  // We begin testing!
  describe('GET /movies', function () {
    // Check if 200
    it('should respond with status 200', function (done) {
      request.get('/api/movies').expect(200, done);
      done();
    });

    // Check if we obtain movies
    it('should respond with the list of movies', function (done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          // We check if the object obtained is equal to this:
          data: moviesMock,
          message: 'Movies listed!',
        });
      });
      done();
    });
  });
});
