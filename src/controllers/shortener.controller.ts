import { NextFunction, Request, RequestHandler, Response } from "express";
import { UrlService } from "../services/shortener.service";
import { ShortenerRequestDto } from "../dtos/shortener-request.dto";
import { ResponseDto } from "../dtos/response.dto";
import { ResponseStatus } from "../dtos/response-enum";
import { SuccessMessages } from "../constants/success-messages";
import httpStatus from "http-status";

export class UrlShortenerController {
  private readonly urlService: UrlService;

  constructor(urlService: UrlService) {
    this.urlService = urlService;
  }

  encode: RequestHandler = async (req: Request, res: Response,next: NextFunction) => {
    try {
      const response = await this.urlService.encode(req.body as ShortenerRequestDto);
      const responseObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.URL_SHORTENED, response);
      return res.status(httpStatus.CREATED).send(responseObj);
    } catch (e) {
      next(e);
    }
  };
}
