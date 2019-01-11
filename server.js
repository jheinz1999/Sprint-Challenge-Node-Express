const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

const projectRouter = require('./projects');
const actionRouter = require('./actions');

server.use(cors());
server.use(express.json());
server.use(helmet());

server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {

  res.status(200).send('Working!');

});

module.exports = server;
