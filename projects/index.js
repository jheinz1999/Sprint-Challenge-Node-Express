const express = require('express');

const projectDB = require('../data/helpers/projectModel');
const genericErr = require('../common/genericErr');

const server = express.Router();

server.get('/', async (req, res) => {

  try {

    const data = await projectDB.get();
    res.status(200).json(data);

  }

  catch (err) {

    genericErr(res);

  }

});

server.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const project = await projectDB.get(id);
    res.status(200).json(project);

  }

  catch (err) {

    res.status(404).json({message: 'The project with that ID does not exist.'});

  }

});

module.exports = server;
