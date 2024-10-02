export class TimeoutError extends Error {
  constructor() {
    super("Request Timeout");
  }
}
