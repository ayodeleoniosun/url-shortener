import Url from '../models/url';
import { IUrl } from '../interfaces/url/url';
import { UrlInterface } from '../interfaces/url/url.interface';

export class UrlRepository implements UrlInterface {
  async save(url: IUrl): Promise<IUrl> {
    return await new Url(url).save();
  }

  async getShortCodeByUrl(original_url: string): Promise<IUrl> {
    return await Url.findOne({ original_url });
  }

  async getUrlByShortCode(short_code: string): Promise<IUrl> {
    return await Url.findOne({ short_code });
  }
}
