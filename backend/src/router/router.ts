import express, { Request, Response } from 'express'
import { CadastrarController } from '../controllers/CadastrarController/CadastrarController'
import { LogarController } from '../controllers/LogarController/LogarController'

const router = express.Router()


router.get('/', (req: Request, res: Response) => {
	res.end('Inicio')
})

router.post('/logar', LogarController)

router.post('/cadastrar', CadastrarController)

//router.get('/user', UserController)

export default router
