import express from 'express';

class HttpResponse {
  success(res: express.Response, data: any) {
    return res.status(200).json({
      message: "Request successfull",
      code: 200,
      data,
    });
  }

  error(res: express.Response, message: string) {
    return res.status(500).json({
      message,
      code: 500,
    });
  }

  notFound(res: express.Response, message: string) {
    return res.status(404).json({
      message,
      code: 404,
    });
  }

  badRequest(res: express.Response, message: string) {
    return res.status(400).json({
      message,
      code: 400,
    });
  }

  validationError(res: express.Response, err: string) {
    return res.status(400).json({
      message: "Validation error, please check your inputs",
      code: 400,
      err,
    });
  }
}

export default HttpResponse