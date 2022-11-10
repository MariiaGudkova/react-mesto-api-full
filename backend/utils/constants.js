const BAD_REQUEST_ERROR_CODE = 400;
const UNAUTHORIZATION_ERROR_CODE = 401;
const FORBIDDEN_ERROR_CODE = 403;
const NOTFOUND_ERROR_CODE = 404;
const CONFLICT_ERROR_CODE = 409;
const SERVER_ERROR_CODE = 500;

const allowedCors = [
  'http://mesto.project.gudkova.nomoredomains.icu',
  'https://mesto.project.gudkova.nomoredomains.icu',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

module.exports = {
  BAD_REQUEST_ERROR_CODE,
  UNAUTHORIZATION_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
  NOTFOUND_ERROR_CODE,
  CONFLICT_ERROR_CODE,
  SERVER_ERROR_CODE,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
