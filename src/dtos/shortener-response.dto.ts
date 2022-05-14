import { IUrl } from '../interfaces/url/url';
import 'dotenv/config';

export class ShortenerResponseDto {
  short_code: string;
  original_url: string;
  short_url: string;

  constructor(url: IUrl) {
    this.short_code = url.short_code;
    this.original_url = url.original_url;
    this.short_url = `${process.env.BASE_URL}/${this.short_code}`;
  }
}
