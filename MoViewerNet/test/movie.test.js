/**
 * https://www.npmjs.com/package/supertest
 */
const request = require('supertest');
const app     = require('../app/app.js');



describe('/api/v1/movie tests', () => {

  let movieSpy;
  let movieSpyFindById;
  beforeAll( () => {
    const Movie = require('../app/models/movie.js');
    movieSpy = jest.spyOn(Movie, 'find').mockImplementation((criterias) => {
      return [{
        id: 1010,
        titolo: 'Software Engineering 2',
        regista: 'unitn',
        copertina: 'simple jpeg',
        durata: '6'
      }];
    });
    movieSpyFindById = jest.spyOn(Movie, 'findById').mockImplementation((id) => {
      if (id==1010)
        return {
          id: 1010,
          titolo: 'Software Engineering 2',
          regista: 'unitn',
          copertina: 'simple jpeg',
          durata: '6'
        };
      else
        return {};
    });
  });
  afterAll(async () => {
    movieSpy.mockRestore();
    movieSpyFindById.mockRestore();
  });
  


  test('GET /api/v1/movie/getAll should respond with an array of books and code 200', async () => {
    return request(app)
      .get('/api/v1/movie/getAll')
      .expect('Content-Type', /json/)
      .expect(200)
      .then( (res) => {
        if(res.body && res.body[0]) {
          expect(res.body[0]).toEqual({
            self: '/api/v1/movie/1010',
            titolo: 'Software Engineering 2',
            regista: 'unitn',
            copertina: 'simple jpeg',
            durata: '6'
          });
        }
      });
  });

  
  test('GET /api/v1/movie/:id should respond with json and code 200', async () => {
    return request(app)
      .get('/api/v1/movie/1010')
      .expect('Content-Type', /json/)
      .expect(200, {
          self: '/api/v1/movie/1010',
          titolo: 'Software Engineering 2',
          regista: 'unitn',
          copertina: 'simple jpeg',
          durata: '6'
        });
  });

  test('GET /api/v1/movie/getByTitleRegist:param should respond with an array of movies (json) and code 200', async () => {
    return request(app)
      .get('/api/v1/movie/getByTitleRegist/Software Engineering 2')
      .expect('Content-Type', /json/)
      .expect(200, [
        {
          self: '/api/v1/movie/1010',
          titolo: 'Software Engineering 2',
          regista: 'unitn',
          copertina: 'simple jpeg',
          durata: '6'
        }
      ]);
  });

});
