const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const games = require('../data/db.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'heeeey yaaaall'})
});

server.get('/games', (req, res) => {
    res.status(200).send(games);
})

server.post('/games', (req, res) => {

    if (!req.body.title) {
        return res.status(422).send({ message: 'title is missing'})

    } else if (!req.body.genre) {
        return res.status(422).send({ message: 'genre is missing'});

    }
    const game = {
        title: req.body.title,
        genre: req.body.genre,
    }
    games.push(game);
    return res.status(201).send({ message: 'game added'})
})

module.exports = server;