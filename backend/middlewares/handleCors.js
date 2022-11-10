const { allowedCors, DEFAULT_ALLOWED_METHODS } = require('../utils/constants');

// eslint-disable-next-line consistent-return
function handleCors(req, res) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    return res.end();
  }

  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }
}

module.exports = { handleCors };
