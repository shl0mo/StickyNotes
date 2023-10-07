import express, { Request, Response } from 'express'
import fs from 'fs'

export const CheckSessionController = (req : Request, res: Response) : void => {
	fs.readFile('sessao.txt', 'utf-8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		res.json({ 'user': data })
	})
}
