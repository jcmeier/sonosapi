export class APIAuthenticationError extends Error {
    constructor(message : string) {
      super(message);
      this.name = "APIAuthenticationError";
    }
  }
  