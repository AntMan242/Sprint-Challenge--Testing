const request = require('supertest');

const server = require('./server.js');

describe('server.js', () => {
    // describe('GET /', () => {

    //     it('should return status code 200', async () => {
    //         const res = await request(server).get('/');

    //         expect(res.status).toBe(200);
    //     });

    //     it('should return JSON', async () => {
    //         const res = await request(server).get('/');
    //         expect(res.type).toBe('application/json');
    //     });

    //     it('should return "heeeey yaaaall"', async () => {
    //         const res = await request(server).get('/');
    //         expect(res.body).toEqual({ message: 'heeeey yaaaall'});
    //     })
    // })

    describe('GET/games', () => {
        it('should return status code 200', () => {;
            return request(server).get('/games')
            .expect(200)
        })

        it('returns something',  () => {
            return request(server).get('/games')
            .then(response => {
                expect(Array.isArray(response.body)).toBe(true)
            })
            
        })

        it('returns with status code 200 OK', async () => {
            request(server)
            .get('/')
            .expect('Content-Type', /json/i);
        });
    });

    describe('POST/games', () => {
        it('should receive status code 201 if complete', () => {
            const game = { title: 'Tecmo Bowl', genre: 'Sports'};
            return request(server)
            .post('/games')
            .send(game)
            .expect(201)
        });

        it('returns a 422 status code when genre is missing',  () => {
            const game = { title: 'Tecmo Bowl'};
            return request(server)
            .post('/games')
            .send(game)
            .expect(422)
        });

        it('returns a 422 status code if title is missing', () => {
            const game = { genre: 'Sports'};
            return request(server)
            .post('/games')
            .send(game)
            .expect(422)
        })
    })
})