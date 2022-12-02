export default class SuccessMessage {

  timestamp: number;
  message: string;
  path: string;

  constructor(message: string, path: string) {
    this.timestamp = Math.floor(Date.now() / 1000);
    this.message = message;
    this.path = path;
  }

}