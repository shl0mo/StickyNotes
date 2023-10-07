import express, { Request, Response } from 'express'
import { CadastrarController } from '../controllers/CadastrarController/CadastrarController'

const router = express.Router()


router.get('/', (req: Request, res: Response) => {
	res.end('Inicio')
})

router.post('/logar', (req: Request, res: Response) => {
	
})

router.post('/cadastrar', CadastrarController)

//router.get('/user', UserController)

export default router
