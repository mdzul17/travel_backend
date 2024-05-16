class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);

    if (this.constructor.name === "ClientError") {
      throw new Error("can not instantiate abstract class");
    }

    this.statusCode = statusCode;
    this.name = "ClientError";
  }
}

module.exports = ClientError;
