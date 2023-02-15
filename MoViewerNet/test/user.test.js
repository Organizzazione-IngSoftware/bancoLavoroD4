/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const jwt     = require('jsonwebtoken');
const app     = require('../app/app.js');



describe('GET /api/v1/user tests', () => {

  let userSpy;
  beforeAll( () => {
    const User = require('../app/models/user');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
      return {
        id: 1212,
        mail: 'john@gmail.com'
      };
    });
  });
  afterAll(async () => {
    userSpy.mockRestore();
  });


  //no token tests
  test('GET /api/v1/user/donation with no token should return 401', async () => {
    const response = await request(app).get('/api/v1/user/donation');
    expect(response.statusCode).toBe(401);
  });

  var payload = {
    email: 'john@gmail.com'
  }
  var options = {
    expiresIn: 86400
  }
  var token = jwt.sign(payload, process.env.SUPER_SECRET, options);
  
  //token tests
  test('GET /api/v1/user/donation with valid token should return 200', async () => {
    expect.assertions(1);
    const response = await request(app).get('/api/v1/user/donation?token='+token);
    expect(response.statusCode).toBe(200);
  });

  /*test('GET /api/v1/students/me?token=<valid> should return user information', async () => {
    expect.assertions(2);
    const response = await request(app).get('/api/v1/students/me?token='+token);
    const user = response.body;
    expect(user).toBeDefined();
    expect(user.email).toBe('John@mail.com');
  });*/
});
