'use strict';

const { v4: uuidv4 } = require('uuid');

// this function is used as unique ID
// can be used as primary key or other id
const uid = () => {
  return uuidv4();
};

module.exports = {
  uid,
};