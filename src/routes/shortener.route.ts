import { Router } from 'express';
import { UrlShortenerController } from '../controllers/shortener.controller';
import { UrlService } from '../services/shortener.service';
import { UrlRepository } from '../repositories/url.repository';
import { UrlUtility } from '../utils/helpers/url.utility';
import { RedisService } from '../services/redis.service';

const urlRepository = new UrlRepository();
const urlUtility = new UrlUtility();
const redisService = new RedisService();
const urlService = new UrlService(urlRepository, urlUtility, redisService);
const urlShortener = new UrlShortenerController(urlService);
const router: Router = Router();

router.post('/encode', urlShortener.encode);

export default router;
