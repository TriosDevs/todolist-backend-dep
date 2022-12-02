export default class SuccessDataMessage<T> {

  timestamp: number;
  message: string;
  content: T;
  path: string;

  constructor(message: string, content: T, path: string) {
    this.timestamp = Math.floor(Date.now() / 1000);
    this.message = message;
    this.content = content;
    this.path = path;
  }

}