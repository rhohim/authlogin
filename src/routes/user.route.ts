import { Router } from 'express'
import * as UserController from '../controllers/user.controller'
// import { authenticateAndAuthorize } from '../middleware/bearerToken.middleware'

const router = Router()

router
  .route('/')
  .get(UserController.getallUserController)
  .post(UserController.postUserController)
  .delete(UserController.deleteallUserController)

router
  .route('/:id')
  .get(UserController.getUserByIdController)
  .delete(UserController.deletUserByIdController)
  .put(UserController.putUserByIdController)

export default router
