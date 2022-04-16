import request from 'supertest';
import app from '../../src/app';
import { UrlRepository } from '../../src/repositories/url.repository';
import { UrlService } from '../../src/services/shortener.service';
import { UrlUtility } from '../../src/utils/helpers/url.utility';
import { RedisService } from '../../src/services/redis.service';
import { ShortenerRequestDto } from '../../src/dtos/shortener-request.dto';
import { ShortenerResponseDto } from '../../src/dtos/shortener-response.dto';
import HttpException from '../../src/utils/exceptions/http.exceptions';
import Url from '../../src/models/url';
import { ErrorMessages } from '../../src/enums/error-messages';
import httpStatus from 'http-status';

const original_url = 'http://www.testing.com';
let urlService: UrlService;
let redisService: RedisService;
let shortCode: string;

beforeAll(async () => {
  const urlRepository = new UrlRepository();
  const urlUtility = new UrlUtility();
  redisService = new RedisService();
  urlService = new UrlService(urlRepository, urlUtility, redisService);

  const payload = { original_url };
  const res = await request(app).post('/api/shorten').send(payload).set('Accept', 'application/json');
  const response = JSON.parse(res.text);
  shortCode = response.data.short_code;
});

afterAll(async () => {
  await Url.remove({ where: { original_url } });
  redisService.remove(original_url);
});

describe('/shortener', () => {
  it('should be succesful if valid original url is supplied', async () => {
    const payload: ShortenerRequestDto = { original_url };
    const response = expect(urlService.shorten(payload));
    response.resolves.toBeInstanceOf(ShortenerResponseDto);
    response.resolves.toHaveProperty('short_code');
    response.resolves.toHaveProperty('original_url');
  });

  it('should throw a bad request exception if the invalid url is supplied', async () => {
    const original_url = 'sample invalid url';
    const payload: ShortenerRequestDto = { original_url };
    const response = expect(urlService.shorten(payload));
    response.rejects.toBeInstanceOf(HttpException);
    response.rejects.toHaveProperty('status', httpStatus.BAD_REQUEST);
    response.rejects.toHaveProperty('message', ErrorMessages.INVALID_URL);
  });
});

describe('/visit', () => {
  it('should be succesful if short code exists', async () => {
    const response = expect(urlService.getUrlByShortCode(shortCode));
    response.resolves.toBeInstanceOf(ShortenerResponseDto);
    response.resolves.toHaveProperty('short_code', shortCode);
    response.resolves.toHaveProperty('original_url', original_url);
  });

  it('should throw a not found exception if short code does not exists', async () => {
    const shortCode = 'sample_short_code';
    const response = expect(urlService.getUrlByShortCode(shortCode));
    response.rejects.toBeInstanceOf(HttpException);
    response.rejects.toHaveProperty('status', httpStatus.NOT_FOUND);
    response.rejects.toHaveProperty('message', ErrorMessages.URL_NOT_FOUND);
  });
});
