import { Request, RequestHandler, Response } from 'express';
import { ResponseDto } from '../dtos/response.dto';
import { ResponseStatus } from '../dtos/response-status';
import { SuccessMessages } from '../enums/success-messages';
import httpStatus from 'http-status';
import { StatisticsService } from '../services/statistics.service';

export class StatisticsController {
  private readonly statisticsService: StatisticsService;

  constructor(statisticsService: StatisticsService) {
    this.statisticsService = statisticsService;
  }

  statistics: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { short_code } = req.params;
      const response = await this.statisticsService.statistics(short_code);
      console.log(response);
      const responseObj = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.URL_RETRIEVED, response);
      return res.status(httpStatus.OK).send(responseObj);
    } catch (err) {
      const error = JSON.parse(JSON.stringify(err));
      const errorObj = new ResponseDto(ResponseStatus.ERROR, error.message);
      return res.status(error.status).send(errorObj);
    }
  };
}
