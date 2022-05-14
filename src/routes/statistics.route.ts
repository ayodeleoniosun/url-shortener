import { Router } from 'express';
import { UrlRepository } from '../repositories/url.repository';
import { StatisticsService } from '../services/statistics.service';
import { StatisticsController } from '../controllers/statistics.controller';
import { VisitorRepository } from '../repositories/visitor.repository';

const urlRepository = new UrlRepository();
const visitorRepository = new VisitorRepository();
const statisticsService = new StatisticsService(urlRepository, visitorRepository);
const statisticsController = new StatisticsController(statisticsService);
const router: Router = Router();

router.get('/statistics/:short_code', statisticsController.statistics);

export default router;
