import { IUrl } from './url';

export interface UrlInterface {
  getShortCodeByUrl(originalUrl: string): Promise<IUrl>;
  getUrlByShortCode(shortCode: string): Promise<IUrl>;
}
