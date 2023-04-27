import { Router } from 'express';
import CarController from '../Controllers/car.controller';

const router = Router();

router
  .get('/cars', (req, res, next) => new CarController(req, res, next).getAll());

export default router;
