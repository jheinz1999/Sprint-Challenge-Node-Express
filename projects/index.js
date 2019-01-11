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

module.exports = server;
