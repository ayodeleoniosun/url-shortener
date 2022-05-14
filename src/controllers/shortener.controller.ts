import { Request, RequestHandler, Response } from 'express';
import { UrlService } from '../services/shortener.service';
import { ShortenerRequestDto } from '../dtos/shortener-request.dto';
import { ResponseDto } from '../dtos/response.dto';
import { ResponseStatus } from '../dtos/response-status';
import { SuccessMessages } from '../enums/success-messages';
import httpStatus from 'http-status';

export class UrlShortenerController {
  private readonly urlService: UrlService;

  constructor(urlService: UrlService) {
    this.urlService = urlService;
  }

  shorten: RequestHandler = async (req: Request, res: Response) => {
    try {
      const response = await this.urlService.shorten(req.body as ShortenerRequestDto);
      const responseObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.URL_SHORTENED, response);
      return res.status(httpStatus.CREATED).send(responseObj);
    } catch (err) {
      const error = JSON.parse(JSON.stringify(err));
      const errorObj = new ResponseDto(ResponseStatus.ERROR, error.message);
      return res.status(error.status).send(errorObj);
    }
  };

  get: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { short_code } = req.params;
      const response = await this.urlService.getUrlByShortCode(short_code, req.ip);
      const responseObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.URL_RETRIEVED, response);
      return res.status(httpStatus.OK).send(responseObj);
    } catch (err) {
      const error = JSON.parse(JSON.stringify(err));
      const errorObj = new ResponseDto(ResponseStatus.ERROR, error.message);
      return res.status(error.status).send(errorObj);
    }
  };
}
