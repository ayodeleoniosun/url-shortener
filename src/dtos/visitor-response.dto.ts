import 'dotenv/config';
import { IVisitor } from '../interfaces/visitor/visitor';
import { IUrl } from '../interfaces/url/url';

export class VisitorResponseDto {
  url_id: IUrl;
  ip_address: string;
  city: string;
  state: string;
  country: string;

  constructor(visitor: IVisitor) {
    this.url_id = visitor.url_id;
    this.ip_address = visitor.ip_address;
    this.city = visitor.city;
    this.state = visitor.state;
    this.country = visitor.country;
  }
}
