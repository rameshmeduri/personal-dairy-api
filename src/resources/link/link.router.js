import { Router } from 'express';
import controllers from './link.controllers';

const router = Router();

// /api/link
router
  .route('/')
  .get(controllers.getOne)
  .post(controllers.createOne);

// /api/link/:id
router
  .route('/:id')
  .get(controllers.getOne)
  .put(controllers.updateOne)
  .delete(controllers.removeOne);

export default router;
