import express, { Request, Response } from 'express'
import { User } from '../../models/User/User'

export const CadastrarController = (req: Request, res: Response) : void => {
	const username = req.body.username
	const password = req.body.password
	const user : any = new User(
		username,
		password
	)
	user.save(res)
}
