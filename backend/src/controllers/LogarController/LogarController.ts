import express, { Request, Response } from 'express'
import fs from 'fs'
import _ from 'lodash'
import dotenv from 'dotenv'

dotenv.config()

const USERS_DOCUMENT = process.env.USERS_DOCUMENT

export const LogarController = (req: Request, res: Response) : void => {
	const file_path = `./src/database/${USERS_DOCUMENT}`
	const username = req.body.username
	const password = req.body.password
	fs.readFile(file_path, 'utf-8', (err, data) => {
		const users_array = JSON.parse(data)
		if (_.find(users_array, { "username": username, "password": password })) {
			fs.writeFileSync('sessao.txt', username)
			const message = 'Login realizado com sucesso'
			res.json({ "message": message })
		} else {
			const message = "Usuário ou senha inválidos" 
			res.json({ "message": message })
		}
	})
}
