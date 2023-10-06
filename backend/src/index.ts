import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import { UserController } from './controllers/UserController/UserController'

dotenv.config()
const PORT = process.env.PORT || 7777

const app = express()

app.get('/', (req: Request, res: Response) => {
	res.end('Inicio')
})

app.get('/login', (req: Request, res: Response) => {
	
})

app.get('/user', UserController)

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
