const errorMiddleware = (error, req, res, next) => {
  console.log(error);
  error.statusCode = error.status || 500;
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
  });
};
module.exports = errorMiddleware;
