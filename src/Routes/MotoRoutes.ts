import { Router } from 'express';
import MotoController from '../Controllers/MotoController';

const router = Router();

router
  .get('/', (req, res, next) => new MotoController(req, res, next).getAll())
  .get('/:id', (req, res, next) => new MotoController(req, res, next).getById())
  .post('/', (req, res, next) => new MotoController(req, res, next).create())
  .put('/:id', (req, res, next) => new MotoController(req, res, next).update());

export default router;
