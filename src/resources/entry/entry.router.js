import { Router } from 'express';
import controllers from './entry.controllers';

const router = Router();

// /api/entry
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne);

// /api/entry/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
