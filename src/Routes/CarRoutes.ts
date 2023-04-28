import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

router
  .get('/', (req, res, next) => new CarController(req, res, next).getAll())
  .get('/:id', (req, res, next) => new CarController(req, res, next).getById())
  .post('/', (req, res, next) => new CarController(req, res, next).create())
  .put('/:id', (req, res, next) => new CarController(req, res, next).update());

export default router;
