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
    return this.request('shorten', SuccessMessages.URL_SHORTENED, httpStatus.CREATED, req, res);
  };

  get: RequestHandler = async (req: Request, res: Response) => {
    return this.request('get', SuccessMessages.URL_RETRIEVED, httpStatus.OK, req, res);
  };

  request = async (type: string, successMessage: string, httpStatus: number, req: Request, res: Response) => {
    try {
      let response;

      if (type === 'shorten') {
        response = await this.urlService.shorten(req.body as ShortenerRequestDto);
      } else if (type === 'get') {
        response = await this.urlService.getUrlByShortCode(req);
      }

      const responseObj = new ResponseDto(ResponseStatus.SUCCESS, successMessage, response);
      return res.status(httpStatus).send(responseObj);
    } catch (err) {
      const error = JSON.parse(JSON.stringify(err));
      const errorObj = new ResponseDto(ResponseStatus.ERROR, error.message);
      return res.status(error.status).send(errorObj);
    }
  };
}
