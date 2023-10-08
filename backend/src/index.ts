import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import body_parser from 'body-parser'
import cors from 'cors'

import requests from './requests/requests'

dotenv.config()
const PORT = process.env.PORT || 7777

const app = express()

app.use(body_parser.json())
app.use(cors())
app.use(requests)

app.listen(PORT, () => {
	console.log(`Servidor rodando na porta ${PORT}`)
})
