class HttpException {
  status: number;
  message: string;

  constructor(message: string, status: number) {
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
