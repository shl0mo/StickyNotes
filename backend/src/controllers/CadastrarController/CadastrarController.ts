import express, { Request, Response } from 'express'
import { User } from '../../models/User/User'

export const CadastrarController = (req: Request, res: Response) : void => {
	const _name = req.body.name
	const _password = req.body.password
	const user: any = new User(
		_name,
		_password
	)
	const message : string = user.saveUser()
	res.send(message)
}
