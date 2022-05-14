import { IUrl } from '../url/url';

export interface IVisitor {
  url_id: IUrl;
  ip_address: string;
  city: string;
  state: string;
  country: string;
}
