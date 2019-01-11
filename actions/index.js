const express = require('express');

const projectDB = require('../data/helpers/projectModel');
const actionDB = require('../data/helpers/actionModel');
const genericErr = require('../common/genericErr');

const server = express.Router();

server.get('/', async (req, res) => {

  try {

    const data = await actionDB.get();
    res.status(200).json(data);

  }

  catch (err) {

    genericErr(res);

  }

});

server.get('/:id', async (req, res) => {

  const id = req.params.id;

  try {

    const action = await actionDB.get(id);
    res.status(200).json(action);

  }

  catch (err) {

    res.status(404).json({message: 'The action with that ID does not exist.'});

  }

});

server.post('/', async (req, res) => {

  let { project_id, description, notes } = req.body;

  if (!project_id) {

    res.status(400).json({message: 'Please send a project ID!'});
    return;

  }

  if (!description) {

    description = 'No description provided.';

  }

  if (!notes) {

    notes = 'No note provided.';

  }

  if (description.length > 128) {

    res.status(400).json({message: 'Invalid description!'});
    return;

  }

  try {

    const action = await actionDB.insert({project_id, description, notes});

    res.status(201).json(action);

  }

  catch (err) {

    genericErr(res);

  }

});

server.delete('/:id', async (req, res) => {

  const id = req.params.id;
  let action;

  try {

    try {

      action = await actionDB.get(id);

    }

    catch (err) {

      res.status(404).json({message: 'The action with that ID does not exist.'});
      return;

    }

    await actionDB.remove(id);

    res.status(200).json({message: 'Action successfully deleted.'});

  }

  catch (err) {

    genericErr(res);

  }

});

server.put('/:id', async (req, res) => {

  const id = req.params.id;
  let { name, description, completed } = req.body;
  let project;

  try {

    project = await projectDB.get(id);

  }

  catch (err) {

    res.status(404).json({message: 'The project with that ID does not exist.'});
    return;

  }

  if (!name && !description && !completed) {

    res.status(400).json({message: 'Invalid properties in request body!'});
    return;

  }

  if (!name)
    name = project.name;

  if (!description)
    description = project.description;

  if (completed === undefined)
    completed = project.completed;

  try {

    const newProject = await projectDB.update(id, {name, description, completed});
    res.status(200).json(newProject);

  }

  catch (err) {

    genericErr(res);

  }

});

module.exports = server;
