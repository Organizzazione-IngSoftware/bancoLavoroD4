/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const app     = require('../app/app.js');

test('app module should be defined', () => {
  expect(app).toBeDefined();
});