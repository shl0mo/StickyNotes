import express, { Request, Response } from 'express'
import { CadastrarController } from '../controllers/CadastrarController/CadastrarController'
import { LogarController } from '../controllers/LogarController/LogarController'
import { SairController } from '../controllers/SairController/SairController'
import { CheckSessionController } from '../controllers/CheckSessionController/CheckSessionController'
import { CriarLembreteController } from '../controllers/CriarLembreteController/CriarLembreteController'

const router = express.Router()


router.get('/', (req: Request, res: Response) => {
	res.end('Inicio')
})

router.post('/logar', LogarController)

router.post('/cadastrar', CadastrarController)

router.post('/sair', SairController)

router.post('/checkSession', CheckSessionController)

router.post('/criarLembrete', CriarLembreteController)

export default router
