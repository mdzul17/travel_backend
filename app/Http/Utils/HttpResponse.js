module.exports = {
  success: function (res, data) {
    return res.status(200).json({
      message: "Request successfull",
      code: 200,
      data,
    });
  },
  error: function (res, message) {
    return res.status(500).json({
      message,
      code: 500,
    });
  },
  notFound: function (res, message) {
    return res.status(404).json({
      message,
      code: 404,
    });
  },
  badRequest: (message) => {
    return res.status(400).json({
      message,
      code: 400,
    });
  },
  validationError: function (res, err) {
    return res.status(400).json({
      message: "Validation error, please check your inputs",
      code: 400,
      err,
    });
  },
};
