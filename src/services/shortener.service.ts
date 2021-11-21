import { IUrlRepository } from '../repositories/interfaces/url.repository.interface';
import { IUrl } from '../interfaces/url.interface';
import { ErrorMessages } from '../constants/error-messages';
import HttpStatus from 'http-status';
import HttpException from '../utils/exceptions/http.exceptions';
import { UrlUtility } from '../utils/helpers/url.utility';
import { ShortenerResponseDto } from '../dtos/shortener-response.dto';
import { ShortenerRequestDto } from 'src/dtos/shortener-request.dto';
import { RedisService } from './redis.service';

export class UrlService {
  private readonly urlRepository: IUrlRepository;
  private readonly UrlUtility: UrlUtility;
  private readonly redisService: RedisService;

  constructor(
    urlRepository: IUrlRepository,
    UrlUtility: UrlUtility,
    redisService: RedisService
  ) {
    this.urlRepository = urlRepository;
    this.UrlUtility = UrlUtility;
    this.redisService = redisService;
  }

  async shorten(payload: ShortenerRequestDto): Promise<ShortenerResponseDto> {
    const { original_url } = payload;
    const isValidUrl = this.UrlUtility.isValidUrl(original_url);

    if (!isValidUrl) {
      throw new HttpException(
        ErrorMessages.INVALID_URL,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const response = new ShortenerResponseDto();

    //check if url exists in redis
    const shortUrl = await this.redisService.get(original_url);

    if (shortUrl) {
      response.short_code = shortUrl;
      response.original_url = original_url;
      return response;
    }

    //if not foumd in redis, check in db
    const url = await this.getShortCodeByUrl(original_url);

    if (url) {
      response.short_code = url.short_code;
      response.original_url = url.original_url;
      return response;
    }

    //else, insert new shortened url in both db and redis
    const shortCode = this.UrlUtility.generateShortCode(5);
    await this.redisService.set(original_url, shortCode);

    const newUrl = await this.urlRepository.save({
      short_code: shortCode,
      original_url: original_url
    });

    response.short_code = newUrl.short_code;
    response.original_url = newUrl.original_url;
    return response;
  }

  async getShortCodeByUrl(originalUrl: string): Promise<IUrl> {
    let url: IUrl;

    try {
      url = await this.urlRepository.getShortCodeByUrl(originalUrl);
    } catch (e) {
      console.log(e);
      throw new HttpException(
        ErrorMessages.URL_RETRIEVAL_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    if (!url) {
      throw new HttpException(
        ErrorMessages.URL_NOT_FOUND,
        HttpStatus.NOT_FOUND
      );
    }

    return url;
  }
}
