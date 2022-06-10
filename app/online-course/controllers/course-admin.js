'use strict';

const appResponse = require('./app-response');
const service = require('../services/course/admin');

const all = async (req, res) => {
  appResponse.build(res, await service.all(req.query));
};

const create = async (req, res) => {
  appResponse.build(res, await service.create(req.body));
};

const show = async (req, res) => {
  appResponse.build(res, await service.show(req.params.id));
};

const update = async (req, res) => {
  appResponse.build(res, await service.update(req.params.id, req.body));
};

const destroy = async (req, res) => {
  appResponse.build(res, await service.destroy(req.params.id, req.body));
};

module.exports = {
  all,
  create,
  show,
  update,
  destroy
};
