import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import { authenticateAndAuthorize } from '../middleware/bearerToken.middleware'

const router = Router()

router.post('/login', authController.postAuthController)

router.post('/logout', authController.logoutController)

router.get('/token-test',authenticateAndAuthorize, authController.getTokenTest)


export default router 
