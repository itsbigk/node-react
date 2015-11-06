'use strict';

const Router = require('express').Router;

module.exports = function() {
  let api = Router();

  api.get('/', function(req, res) {
    res.json({
      version: '1.0'
    });
  });

  return api;
}
