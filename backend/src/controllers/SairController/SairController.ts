import express, { Request, Response } from 'express'
import fs from 'fs'

export const SairController = (req : Request, res: Response) => {
	fs.writeFileSync('sessao.txt', '')
	console.log('Sessão encerrada com sucesso')
	res.status(200)
}
