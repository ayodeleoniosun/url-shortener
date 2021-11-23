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
  private readonly urlUtility: UrlUtility;
  private readonly redisService: RedisService;

  constructor(urlRepository: IUrlRepository, urlUtility: UrlUtility, redisService: RedisService) {
    this.urlRepository = urlRepository;
    this.urlUtility = urlUtility;
    this.redisService = redisService;
  }

  async shorten(payload: ShortenerRequestDto): Promise<ShortenerResponseDto> {
    const { original_url } = payload;
    const isValidUrl = this.urlUtility.isValidUrl(original_url);

    if (!isValidUrl) {
      throw new HttpException(ErrorMessages.INVALID_URL, HttpStatus.BAD_REQUEST);
    }

    //check if url exists in redis
    const short_code = await this.redisService.get(original_url);

    if (short_code) {
      return new ShortenerResponseDto({ short_code, original_url });
    }

    //if not found in redis, check in db
    const url = await this.getShortCodeByUrl(original_url);

    if (url) {
      return new ShortenerResponseDto(url);
    }

    //else, insert new shortened url in both db and redis
    const shortCode = this.urlUtility.generateShortCode(5);
    await this.redisService.set(original_url, shortCode);

    const newUrl = await this.urlRepository.save({ short_code: shortCode, original_url: original_url });

    return new ShortenerResponseDto(newUrl);
  }

  async getShortCodeByUrl(originalUrl: string): Promise<IUrl> {
    let url: IUrl;

    try {
      url = await this.urlRepository.getShortCodeByUrl(originalUrl);
    } catch (e) {
      throw new HttpException(ErrorMessages.URL_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return url;
  }

  async getUrlByShortCode(shortCode: string): Promise<ShortenerResponseDto> {
    let url: IUrl;

    try {
      url = await this.urlRepository.getUrlByShortCode(shortCode);
    } catch (e) {
      throw new HttpException(ErrorMessages.URL_NOT_FOUND, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!url) {
      throw new HttpException(ErrorMessages.URL_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new ShortenerResponseDto(url);
  }
}
