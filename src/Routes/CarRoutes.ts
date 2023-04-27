import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

router
  .get('/', (req, res, next) => new CarController(req, res, next).getAll())
  .post('/', (req, res, next) => new CarController(req, res, next).create());

export default router;
