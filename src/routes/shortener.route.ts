import { Router } from 'express';
import { UrlShortenerController } from '../controllers/shortener.controller';
import { UrlService } from '../services/shortener.service';
import { UrlRepository } from '../repositories/url.repository';
import { UrlUtility } from '../utils/helpers/url.utility';
import { RedisService } from '../services/redis.service';
import { VisitorRepository } from '../repositories/visitor.repository';

const urlRepository = new UrlRepository();
const visitorRepository = new VisitorRepository();
const urlUtility = new UrlUtility();
const redisService = new RedisService();
const urlService = new UrlService(urlRepository, visitorRepository, urlUtility, redisService);
const urlShortener = new UrlShortenerController(urlService);
const router: Router = Router();

router.post('/shorten', urlShortener.shorten);
router.get('/:short_code', urlShortener.get);

export default router;
