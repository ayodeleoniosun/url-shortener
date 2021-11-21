import request from 'supertest';
import app from '../../app';
import * as HttpStatus from 'http-status';
import { Url } from '../../db/models/url';
import { ResponseStatus } from '../../src/dtos/response-enum';
import { SuccessMessages } from '../../src/constants/success-messages';
import { ErrorMessages } from '../../src/constants/error-messages';

let original_url: string = 'http://www.test.com';

afterAll(async () => {
  await Url.destroy({ where: { original_url } });
});

describe('/shortener', () => {
  it('should return 201 if valid original url is supplied', async () => {
    const payload = { original_url };
    const res = await request(app).post('/api/shorten').send(payload).set('Accept', 'application/json');
    expect(res.status).toBe(HttpStatus.CREATED);
    expect(res.body.status).toBe(ResponseStatus.SUCCESS);
    expect(res.body.message).toBeDefined();
    expect(res.body.message).toBe(SuccessMessages.URL_SHORTENED);
  });

  it('should return 500 if the original url is supplied', async () => {
    original_url = 'sample invalid url';
    const payload = { original_url };
    const res = await request(app).post('/api/shorten').send(payload).set('Accept', 'application/json');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body.message).toBeDefined();
    expect(res.body.message).toBe(ErrorMessages.INVALID_URL);
  });
});
