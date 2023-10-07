import express, { Request, Response } from 'express'
import fs from 'fs'

export const SairController = (req : Request, res: Response) => {
	fs.writeFileSync('sessao.txt', '')
	const message = 'Sessão encerrada com sucesso'
	console.log(message)
	res.json({ "message": message })
}
