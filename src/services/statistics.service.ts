import { UrlRepository } from '../repositories/url.repository';
import { ErrorMessages } from '../enums/error-messages';
import { VisitorRepository } from '../repositories/visitor.repository';
import HttpStatus from 'http-status';
import HttpException from '../utils/exceptions/http.exceptions';
import { IUrl } from "../interfaces/url/url";

export class StatisticsService {
  private readonly urlRepository: UrlRepository;
  private readonly visitorRepository: VisitorRepository;

  constructor(urlRepository: UrlRepository, visitorRepository: VisitorRepository) {
    this.urlRepository = urlRepository;
    this.visitorRepository = visitorRepository;
  }

  async statistics(shortCode: string): Promise<any> {
    let visitor: object;
    let url: IUrl;

    try {
      url = await this.urlRepository.getUrlByShortCode(shortCode);

      if (!url) {
        throw new HttpException(ErrorMessages.URL_NOT_FOUND, HttpStatus.NOT_FOUND);
      }

      visitor = await this.visitorRepository.getVisitorsStatisticsByUrl(url._id);
    } catch (e) {
      throw new HttpException(ErrorMessages.URL_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return visitor;
  }
}
