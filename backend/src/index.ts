import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

import { UserController } from './controllers/UserController/UserController'

import router from './router/router'

dotenv.config()
const PORT = process.env.PORT || 7777

const app = express()

app.use(router)

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
