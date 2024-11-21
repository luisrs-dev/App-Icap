// AuthRoutes
import { Router } from 'express'
import { registerCtrl, loginCtrl, sessionListCtrl, refreshTokenCtrl } from '../controllers/auth'
import { checkJwt } from '../middleware/checkJwt';

const router =  Router();

router.post('/register', registerCtrl)
router.post('/login', loginCtrl)
router.get('/sessions', checkJwt, sessionListCtrl)
router.post('/refreshToken', refreshTokenCtrl)
export { router }