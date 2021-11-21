import { UrlRepository } from '../../src/repositories/url.repository';
import { UrlService } from '../../src/services/shortener.service';
import { UrlUtility } from '../../src/utils/helpers/url.utility';
import { RedisService } from '../../src/services/redis.service';
import { ShortenerRequestDto } from '../../src/dtos/shortener-request.dto';
import { ShortenerResponseDto } from '../../src/dtos/shortener-response.dto';
import HttpException from '../../src/utils/exceptions/http.exceptions';
import { ErrorMessages } from '../../src/constants/error-messages';
import httpStatus from 'http-status';

let original_url: string = 'http://www.test.com';
let urlService: UrlService;

beforeAll(() => {
  const urlRepository = new UrlRepository();
  const urlUtility = new UrlUtility();
  const redisService = new RedisService();
  urlService = new UrlService(urlRepository, urlUtility, redisService);
});

describe('/shortener', () => {
  it('should be succesful if valid original url is supplied', async () => {
    const payload: ShortenerRequestDto = { original_url };
    const response = expect(urlService.shorten(payload));
    response.resolves.toBeInstanceOf(ShortenerResponseDto);
    response.resolves.toHaveProperty('short_code');
    response.resolves.toHaveProperty('original_url');
  });

  it('should throw an error if the invalid original url is supplied', async () => {
    original_url = 'sample invalid url';
    const payload: ShortenerRequestDto = { original_url };
    const response = expect(urlService.shorten(payload));
    response.rejects.toBeInstanceOf(HttpException);
    response.rejects.toHaveProperty('status', httpStatus.INTERNAL_SERVER_ERROR);
    response.rejects.toHaveProperty('message', ErrorMessages.INVALID_URL);
  });
});
