const express = require('express');

const Alien = require('./aliens/aliens-model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/aliens', (req, res) => {
  Aliens.getAll()
    .then((aliens) => {
      res.status(200).json(aliens);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.get('/aliens/id', (req, res) => {
  res.end();
});

server.post('/aliens', (req, res) => {
  Aliens.insert(req.body)
    .then((hobbit) => {
      res.status(200).json(hobbit);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

server.delete('/aliens/:id', (req, res) => {
  res.end();
});

server.put('/aliens/:id', (req, res) => {
  res.end();
});

module.exports = server;
