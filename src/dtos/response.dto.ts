import { ResponseStatus } from './response-enum';

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
