import express, { Request, Response } from 'express' 
import fs from 'fs'
import dotenv from 'dotenv'
import _ from 'lodash'

dotenv.config()

const USERS_DOCUMENT = process.env.USERS_DOCUMENT

export class User {
	private username: string = ''
	private password: string = ''

	constructor (username: string, password: string) {
		this.setUsername(username)
		this.setPassword(password)
	}

	public setUsername (username: string) : void {
		this.username = username
	}

	public getUsername () : string {
		return this.username
	}

	public setPassword (password: string) : void {
		this.password = password
	}

	public getPassword () : string {
		return this.password
	}

	public save (res : Response) : void {
		const file_path = `./src/database/${USERS_DOCUMENT}`
		fs.readFile(file_path, 'utf-8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			const users_array : object[] = JSON.parse(data)
			if (_.find(users_array, { "username": this.getUsername() })) {
				console.log('erro: usuário já cadastrado')
				res.json({ "message": 'Erro: nome de usuário já cadastrado. Escolha outro' })
				return
			}
			const new_username : string = this.getUsername()
			const new_password : string = this.getPassword()
			const new_user : object = {
				"username": new_username,
				"password": new_password
			}
			users_array.push(new_user)
			console.log(users_array)
			const new_users_data_string : string = JSON.stringify(users_array)
			fs.writeFile(file_path, new_users_data_string, (err) => {
				if (err) console.error(err)
			})
			console.log('sucesso')
			res.json({ "message": 'Usuário cadastrado com sucesso' })
		})
	}
}
