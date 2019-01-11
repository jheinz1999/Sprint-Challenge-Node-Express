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

  if (project_id) {

    if (Number.isNaN(project_id)) {

      res.status(400).json({message: 'Project ID must be a number!'});
      return;

    }

    try {

      await projectDB.get(project_id);

    }

    catch (err) {

      res.status(400).json({message: 'Invalid project ID!'});
      return;

    }

  }

  if (!description) {

    res.status(400).json({message: 'Please send a description!'});

  }

  else if (typeof description !== 'string') {

    res.status(400).json({message: 'Description must be a string!'});
    return;

  }

  if (!notes) {

    notes = 'No note provided.';

  }

  else if (typeof notes !== 'string') {

    res.status(400).json({message: 'Notes must be a string!'});
    return;

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
  let { project_id, description, notes, completed } = req.body;
  let action;

  try {

    action = await actionDB.get(id);

  }

  catch (err) {

    res.status(404).json({message: 'The action with that ID does not exist.'});
    return;

  }

  if (!project_id && !description && !notes && completed === undefined) {

    res.status(400).json({message: 'Invalid properties in request body!'});
    return;

  }

  if (project_id) {

    if (Number.isNaN(project_id)) {

      res.status(400).json({message: 'Project ID must be a number!'});
      return;

    }

    try {

      await projectDB.get(project_id);

    }

    catch (err) {

      res.status(400).json({message: 'Invalid project ID!'});
      return;

    }

  }

  if (!project_id)
    project_id = action.project_id;

  else if (Number.isNaN(project_id)) {

    res.status(400).json({message: 'Project ID must be a number!'});
    return;

  }

  if (!description)
    description = action.description;

  else if (typeof description !== 'string') {

    res.status(400).json({message: 'Description must be a string!'});
    return;

  }

  if (completed === undefined)
    completed = action.completed;

  else if (typeof completed !== 'boolean') {

    res.status(400).json({message: 'Completed must be a boolean!'});
    return;

  }

  if (!notes)
    notes = action.notes;

  else if (typeof notes !== 'string') {

    res.status(400).json({message: 'Notes must be a string!'});
    return;

  }

  try {

    const newAction = await actionDB.update(id, {project_id, description, notes, completed});
    res.status(200).json(newAction);

  }

  catch (err) {

    genericErr(res);

  }

});

module.exports = server;
