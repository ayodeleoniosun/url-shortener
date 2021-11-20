import { IUrlRepository } from "../repositories/interfaces/url.repository.interface";
import { IUrl } from "../interfaces/url.interface";
import { ErrorMessages } from "../constants/error-messages";
import HttpStatus from "http-status";
import HttpException from "../utils/exceptions/http.exceptions";
import { UrlUtility } from "../utils/helpers/url.utility";
import { ShortenerResponseDto } from "../dtos/shortener-response.dto";
import { ShortenerRequestDto } from "src/dtos/shortener-request.dto";

export class UrlService {
  private readonly urlRepository: IUrlRepository;
  private readonly UrlUtility: UrlUtility;

  constructor(urlRepository: IUrlRepository, UrlUtility: UrlUtility) {
    this.urlRepository = urlRepository;
    this.UrlUtility = UrlUtility;
  }

  async encode(payload: ShortenerRequestDto): Promise<ShortenerResponseDto> {
    try {
      const { original_url } = payload;
      const isValidurl = this.UrlUtility.isValidUrl(original_url);

      if (!isValidurl) {
        throw new HttpException(ErrorMessages.INVALID_URL, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const shortCode = this.UrlUtility.generateShortCode(5);
      const newUrl = await this.urlRepository.save({short_code: shortCode, original_url: original_url});

      const response = new ShortenerResponseDto();
      response.short_code = newUrl.short_code;
      response.original_url = newUrl.original_url;
      return response;
    } catch (e) {
      throw new HttpException(ErrorMessages.URL_ENCODING_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUrlByShortCode(shortCode: string): Promise<IUrl> {
    let url: IUrl;
    try {
      url = await this.urlRepository.getUrlByShortCode(shortCode);
    } catch (e) {
      throw new HttpException(ErrorMessages.URL_RETRIEVAL_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (!url) {
      throw new HttpException(ErrorMessages.URL_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return url;
  }
}
