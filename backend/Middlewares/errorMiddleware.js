const errorMiddleware = (error, req, res, next) => {
  // console.log(error);
  error.status = error.status || 500;
  res.status(error.status).json({
    status: error.status,
    message: error.message,
  });
};
module.exports = errorMiddleware;
