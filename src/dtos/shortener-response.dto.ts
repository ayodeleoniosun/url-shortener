import { IUrl } from '../../src/interfaces/url.interface';
import 'dotenv/config';

export class ShortenerResponseDto {
  public short_code: string;
  public original_url: string;
  public short_url: string;

  constructor(url: IUrl) {
    this.short_code = url.short_code;
    this.original_url = url.original_url;
    this.short_url = `${process.env.BASE_URL}/${this.short_code}`;
  }
}
