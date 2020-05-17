const sinon = require('sinon');
const { moviesMock, filteredMoviesMock } = require('./movies-mock');

const getAllStubs = sinon.stub();
getAllStubs.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStubs.withArgs('movies').resolves(filteredMoviesMock(tagQuery));

const createStub = sinon.stub().resolves(moviesMock[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStubs(collection, query);
  }
  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = { getAllStubs, createStub, MongoLibMock };
