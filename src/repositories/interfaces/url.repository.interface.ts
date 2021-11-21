import { IUrl } from '../../interfaces/url.interface';
import { IBaseRepository } from './base.repository.interface';
export interface IUrlRepository extends IBaseRepository<IUrl> {
  getShortCodeByUrl(originalUrl: string): Promise<IUrl>;
}
