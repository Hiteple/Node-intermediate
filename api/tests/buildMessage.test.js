const assert = require('assert');
const { buildMessage } = require('../utils/buildMessage');

describe('utils - buildMessage', function () {
  describe('when receives an entity and action', function () {
    it('should return the correct message', function () {
      const result = buildMessage('Movie', 'create');
      const expect = 'Movie created!';
      assert.strictEqual(result, expect);
    });
  });

  describe('when receives an entity and action and is a list', function () {
    it('should return the correct message with the entity in plural', function () {
      const result = buildMessage('Movie', 'list');
      const expect = 'Movies listed!';
      assert.strictEqual(result, expect);
    });
  });
});
