'use strict';

const appResponse = require('./app-response');
const service = require('../services/course/public');

const all = async (req, res) => {
  appResponse.build(res, await service.all(req.query));
};

const show = async (req, res) => {
  appResponse.build(res, await service.show(req.params.id));
};

module.exports = {
  all,
  show,
};
