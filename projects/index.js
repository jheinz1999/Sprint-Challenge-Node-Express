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

server.post('/', async (req, res) => {

  let { name, description } = req.body;

  if (!name) {

    res.status(400).json({message: 'Please send a project name!'});
    return;

  }

  if (name.length > 128) {

    res.status(400).json({message: 'Invalid project name!'});
    return;

  }

  if (!description) {

    description = 'No description provided.';

  }

  try {

    const project = await projectDB.insert({name, description});

    res.status(201).json(project);

  }

  catch (err) {

    genericErr(res);

  }

});

module.exports = server;
