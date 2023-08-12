export class ResponseMessage {
  #response = null;

  create({ status, message, description = null, responseData = null }) {
    this.#response = {
      status,
      message,
      description,
      data: responseData,
    };
  }

  getResponse() {
    return this.#response;
  }
}
