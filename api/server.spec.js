const request = require('supertest');

const server = require('./server.js');

describe('server', () => {
    describe('GET', () => {

        it('should return status code 200', async () => {
            const res = await request(server).get('/');

            expect(res.status).toBe(200);
        });

        it('should return JSON', async () => {
            const res = await request(server).get('/');
            expect(res.type).toBe('application/json');
        });

        it('should return {message: "heeeey yaaaall"}', async () => {
            const res = await request(server).get('/');
            expect(res.body).toEqual({ message: 'heeeey yaaaall'});
        })
    })

    describe('GET/games', () => {
        it('returns the array of games', async () => {
            const res = await request(server).get('/games');
            expect(res.type).toBe('application/json');
        })

        it('returns status code 200', async () => {
            const res = await request(server).get('/games');
            expect(res.status).toBe(200);
        })

        it('returns an array', async () => {
            const res = await request(server).get('/games');
            expect(Array.isArray(res.body)).toBe(true);
        });
    });

    describe('POST/games', () => {
        it('returns status code 422 if fields are empty', async () => {
            const res = await request(server)
            .post('/games')
            .send({ title: 'RBI Baseball', releaseYear: 1987});

            expect(res.status).toBe(422);
        });

        it('returns status code 201', async () => {
            const res = await request(server)
            .post('/games')
            .send({ title: 'Super Mario Kart', genre: 'Racing'})

            expect(res.body).toBe(201);
        });

        it('returns message that game was added', async () => {
            const res = await request(server)
            .post('/games')
            .send({ title: 'Bases Loaded', genre: 'Sports', releaseYear: 1988 })

            expect(res.body).toEqual({ message: 'Game has been added' })
        })
    })
})