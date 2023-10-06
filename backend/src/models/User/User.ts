import fs from 'fs'
import dotenv from 'dotenv'

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

	public saveUser () {
		fs.readFile(`./src/database/${USERS_DOCUMENT}`, 'utf-8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			console.log(data)
		})
		/*const user = {
			username: getUsername(),
			password: getPassword(),
		}
		const user*/
	}
}
