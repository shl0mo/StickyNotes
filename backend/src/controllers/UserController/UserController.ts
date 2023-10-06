import express, { Request, Response } from 'express'
import { User } from '../../models/User/User'

export const UserController = (req: Request, res: Response) : void => {
	const user: any = new User('user1', 'pass1')
	user.saveUser()
	res.end()
}
