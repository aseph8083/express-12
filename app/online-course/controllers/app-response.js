'use strict';

// this function is used as general response builder
const build = (res, result = {}) => {
  const metadata = result.metadata || { http_code: result.status || 200 };
  
  if (result.error) {
    res.status(metadata.http_code || 500);
  } else {
    res.status(metadata.http_code || 200);
  }

  res.send(result);
};

module.exports = {
  build,
};
