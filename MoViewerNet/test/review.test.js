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



  var payload = {
		email: "pippo@gmail.com",
		id: 1212	
	}
	var options = {
		expiresIn: 86400
	}
	var token = jwt.sign(payload, process.env.SUPER_SECRET, options);



  test('POST /api/v1/review/makeReview returns 404 if no user or no title exists', async () => {
    const response = await request(app).post('/api/v1/review/makeReview?token='+token).send({ mailAutore: 'notexistent@asdasd.com', titolo: 'noexistss', regista: 'noexistss', voto: 3 });
    expect(response.statusCode).toBe(404);
  });


});