import Url from '../models/url';
import { IUrl } from '../interfaces/url';
import { UrlInterface } from '../interfaces/url.interface';

export class UrlRepository implements UrlInterface {
  save(url: IUrl): Promise<IUrl> {
    return new Promise(async (resolve, reject) => {
      try {
        const newUrl = new Url(url);
        await newUrl.save();
        resolve(newUrl as unknown as IUrl);
      } catch (e) {
        reject(e);
      }
    });
  }

  getShortCodeByUrl(original_url: string): Promise<IUrl> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await Url.findOne({ original_url });
        resolve(url as unknown as IUrl);
      } catch (e) {
        reject(e);
      }
    });
  }

  getUrlByShortCode(short_code: string): Promise<IUrl> {
    return new Promise(async (resolve, reject) => {
      try {
        const url = await Url.findOne({ short_code });
        resolve(url as unknown as IUrl);
      } catch (e) {
        reject(e);
      }
    });
  }
}
