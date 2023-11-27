const handleError = (statusCode, message) => {
  const error = new Error();
  error.statusCode = statusCode;
  err.message = message;
  return error;
};
module.exports = handleError;
