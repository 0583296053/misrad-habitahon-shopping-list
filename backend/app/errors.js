class CustomError extends Error {
  constructor(args) {
    super(args)
  }
};

class NotFoundError extends CustomError {
  constructor(item) {
    super(`${item} does not exist`);
    this.statusCode = 404;
  }
};

module.exports = {
  CustomError,
  NotFoundError
};
