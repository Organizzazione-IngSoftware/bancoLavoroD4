/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const app     = require('../app/app.js');



describe('/api/v1/serie tests', () => {

  let serieSpy;
  let serieSpyFindById;
  beforeAll( () => {
    const Serie = require('../app/models/serie.js');
    serieSpy = jest.spyOn(Serie, 'find').mockImplementation((criterias) => {
      return [{
        id: 1010,
        titolo: 'Software Engineering serie 2',
        regista: 'unitn',
        copertina: 'simple jpeg'
      }];
    });
    serieSpyFindById = jest.spyOn(Serie, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          id: 1010,
          titolo: 'Software Engineering serie 2',
          regista: 'unitn',
          copertina: 'simple jpeg'
        };
      else
        return {};
    });
  });
  afterAll(async () => {
    serieSpy.mockRestore();
    serieSpyFindById.mockRestore();
  });
  


  test('GET /api/v1/serie/getAll should respond with an array of serie and code 200', async () => {
    return request(app)
      .get('/api/v1/serie/getAll')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(res.body && res.body[0]) {
          expect(res.body[0]).toEqual({
            self: '/api/v1/serie/1010',
            titolo: 'Software Engineering serie 2',
            regista: 'unitn',
            copertina: 'simple jpeg'
          });
        }
      });
  });

  
  test('GET /api/v1/serie/:id should respond with json and code 200', async () => {
    return request(app)
      .get('/api/v1/serie/1010')
      .expect('Content-Type', /json/)
      .expect(200, {
          self: '/api/v1/serie/1010',
          titolo: 'Software Engineering serie 2',
          regista: 'unitn',
          copertina: 'simple jpeg'
        });
  });

  test('GET /api/v1/serie/getByTitleRegist:param should respond with an array of series (json) and code 200', async () => {
    return request(app)
      .get('/api/v1/serie/getByTitleRegist/Software Engineering serie 2')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          self: '/api/v1/serie/1010',
          titolo: 'Software Engineering serie 2',     
          regista: 'unitn',
          copertina: 'simple jpeg'
        }
      ]);
  });

});
