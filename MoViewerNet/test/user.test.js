/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const jwt     = require('jsonwebtoken');
const app     = require('../app/app.js');
const dotenv = require('dotenv').config();



describe('GET /api/v1/user tests', () => {

  let userSpy;
  beforeAll( () => {
    const User = require('../app/models/user');
    userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
      return {
        id: 1212,
        mail: 'john@gmail.com',
        username: 'john'
      };
    });
  });
  afterAll(async () => {
    userSpy.mockRestore();
  });



  //no token tests

  test('POST /api/v1/user/signUp returns 409 if someone is already logged with this credentials', async () => {
    expect.assertions(1);
    const response4 = await request(app).post('/api/v1/user/signUp').send({ mail: 'pippo@gmail.com', username: 'pippo', password: 'password', passwordSupp: 'password' });
    expect(response4.statusCode).toBe(409);
  });

  test('POST /api/v1/user/signUp returns 400 if the password is not formatted in the right way', async () => {
    expect.assertions(1);
    const response5 = await request(app).post('/api/v1/user/signUp').send({ mail: 'randomemail@gmail.com', username: 'randomm', password: 'pas', passwordSupp: 'pas' });
    expect(response5.statusCode).toBe(400);
  });

  test('POST /api/v1/user/signUp returns 400 if the mail is not formatted in the right way', async () => {
    expect.assertions(1);
    const response6 = await request(app).post('/api/v1/user/signUp').send({ mail: 'vrivbernib', username: 'verberbernb', password: 'mypassw', passwordSupp: 'mypassw' });
    expect(response6.statusCode).toBe(400);
  });

  test('POST /api/v1/user/signUp returns 400 if you inserted two different passwords', async () => {
    expect.assertions(1);
    const response7 = await request(app).post('/api/v1/user/signUp').send({ mail: 'acaso@gmail.com', username: 'acaso', password: 'mypassword1', passwordSupp: 'mypassword2' });
    expect(response7.statusCode).toBe(400);
  });

  test('GET /api/v1/user/donation with no token should return 401', async () => {
    const response1 = await request(app).get('/api/v1/user/donation');
    expect(response1.statusCode).toBe(401);
  });

  test('GET /api/v1/user/setMyPrivacy with no token should return 401', async () => {
    const response2 = await request(app).get('/api/v1/user/setMyPrivacy');
    expect(response2.statusCode).toBe(401);
  });



  var payload = {
		email: "john@gmail.com",
		id: 1212	
	}
	var options = {
		expiresIn: 86400
	}
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);



  test('GET /api/v1/user/donation with valid token should return 200', async () => {
    expect.assertions(1);
    const response3 = await request(app).get('/api/v1/user/donation?token='+token);
    expect(response3.statusCode).toBe(200);
  });

});