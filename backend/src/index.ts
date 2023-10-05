import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 7777

const app = express()

app.post("/login", (req: Request, res: Response) => {
	
})
