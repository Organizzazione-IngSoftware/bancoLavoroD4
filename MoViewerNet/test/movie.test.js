const request = require('supertest');
const app = require('../app/app.js');



describe("Movie tests", () => {
   
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
            durata: '6',
            generi: ['info'],
            piattaforme: ['povo polo ferrari 2']
        }];
        });
        movieSpyFindById = jest.spyOn(Movie, 'findById').mockImplementation((id) => {
        if (id==1010)
            return {
                id: 1010,
                titolo: 'Software Engineering 2',
                regista: 'unitn',
                copertina: 'simple jpeg',
                durata: '6',
                generi: ['softwareEng'],
                piattaforme: ['poloferrari2']
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
        });
});