const express = require('express');
const helmet = require('helmet');

const server = express();

const projectRouter = require ('./projects');

server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter);

server.get('/', (req, res) => {

  res.status(200).send('Working!');

});

module.exports = server;
