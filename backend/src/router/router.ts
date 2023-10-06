import express, { Request, Response } from 'express'
import { UserController } from '../controllers/UserController/UserController'

const router = express.Router()


router.get('/', (req: Request, res: Response) => {
	res.end('Inicio')
})

router.get('/login', (req: Request, res: Response) => {
	
})

router.get('/user', UserController)

export default router
