import { ResponseStatus } from './response-status';

export class ResponseDto {
  status: string;
  message: string;
  data: any;

  constructor(status: ResponseStatus, message: string, data: any = null) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
