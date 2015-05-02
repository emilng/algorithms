var assert = require('assert');
var multiply = require('../src/multiplication.js');

describe('multiply', function() {
  it('should multiply two numbers', function() {
    assert.equal((19*16), multiply(19,16));
  });
  it('should multiply three numbers', function() {
    assert.equal((123 * 4321 * 5678), multiply(123, 4321, 5678));
  });
  it('should return 0 when multiplying by zero', function() {
    assert.equal(0, multiply(123, 0));
  });
  it('should return itself when multiplying by one', function() {
    assert.equal(123, multiply(123, 1));
  });
});