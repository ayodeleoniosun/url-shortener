import request from 'supertest';
import app from '../../src/app';
import * as HttpStatus from 'http-status';
import { ResponseStatus } from '../../src/dtos/response-status';
import { SuccessMessages } from '../../src/enums/success-messages';
import { ErrorMessages } from '../../src/enums/error-messages';
import Url from '../../src/models/url';
import { RedisService } from '../../src/services/redis.service';

const original_url = 'http://www.tester.com';
const redisService: RedisService = new RedisService();
const baseUrl = '/api/v1';

afterAll(async () => {
  await Url.remove({ where: { original_url } });
  redisService.remove(original_url);
});

describe('/shortener', () => {
  it('should return 201 if valid original url is supplied', async () => {
    const payload = { original_url };
    const res = await request(app).post(`${baseUrl}/shorten`).send(payload).set('Accept', 'application/json');
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body.status).toBe(ResponseStatus.SUCCESS);
    expect(res.body.message).toBeDefined();
    expect(res.body.message).toBe(SuccessMessages.URL_SHORTENED);
  });

  it('should return 400 if invalid url is supplied', async () => {
    const original_url = 'sample invalid url';
    const payload = { original_url };
    const res = await request(app).post(`${baseUrl}/shorten`).send(payload).set('Accept', 'application/json');
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
    expect(res.body.message).toBeDefined();
    expect(res.body.message).toBe(ErrorMessages.INVALID_URL);
  });
});

describe('/visit', () => {
  it('should return 200 if the short code exist', async () => {
    const payload = { original_url };
    await request(app)
      .post(`${baseUrl}/shorten`)
      .send(payload)
      .set('Accept', 'application/json')
      .then(async (res) => {
        const response = JSON.parse(res.text);
        expect(res.statusCode).toBe(HttpStatus.CREATED);
        expect(response.status).toBe(ResponseStatus.SUCCESS);
        expect(response.message).toBeDefined();
        expect(response.message).toBe(SuccessMessages.URL_SHORTENED);

        //visit short url
        await request(app)
          .get(`${baseUrl}/${response.data.short_code}`)
          .set('Accept', 'application/json')
          .then(async (res) => {
            const response = JSON.parse(res.text);
            expect(res.statusCode).toBe(HttpStatus.OK);
            expect(response.status).toBe(ResponseStatus.SUCCESS);
            expect(response.message).toBeDefined();
            expect(response.message).toBe(SuccessMessages.URL_RETRIEVED);
          });
      });
  });

  it('should return 404 if the short code does not exist', async () => {
    const shortCode = 'test_code';
    await request(app)
      .get(`${baseUrl}/${shortCode}`)
      .set('Accept', 'application/json')
      .then(async (res) => {
        const response = JSON.parse(res.text);
        expect(res.statusCode).toBe(HttpStatus.NOT_FOUND);
        expect(response.status).toBe(ResponseStatus.ERROR);
        expect(response.message).toBeDefined();
        expect(response.message).toBe(ErrorMessages.URL_NOT_FOUND);
      });
  });
});
