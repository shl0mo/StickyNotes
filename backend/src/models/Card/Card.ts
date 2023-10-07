import express, { Request, Response } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const CARD_DOCUMENT = process.env.CARD_DOCUMENT


export class Card {
	private user: string = ''
	private title : string = ''
	private inclusion_time: string = ''
	private deadline : string = ''
	private text : strin = ''

	constructor (user, title, inclusion_time, deadline, text) {
		this.setUser(user)
		this.setTitle(title)
		this.setInclusionTime(inclusion_time)
		this.setDeadline(deadline)
		this.setText(text)
	}

	public setUser (user : string) : void {
		this.username = user
	}

	public getUser () : string {
		return this.user
	}

	public setTitle (title : string) : void {
		this.title = title
	}

	public getTitle () : string {
		return this.title
	}

	public setInclusionTime (inclusion_time : string) : void {
		this.inclusion_time = inclusion_time
	}

	public getInclusionTime () : string {
		return this.inclusion_time
	}

	public setDeadline (deadline : string) : void {
		this.deadline = deadline
	}

	public getDeadline () : string {
		return this.deadline
	}

	public setText (text : string) : void {
		this.text = text
	}

	public getText () : string {
		return this.text
	}

	public save (res : Response) : void {
		const file_path = `./src/database/${CARDS_DOCUMENT}`
		fs.readFile(file_path, 'utf-8', (err, data) => {
			if (err) {
				console.error(err)
				return
			}
			const cards_array : object[] = JSON.parse(data)
			const new_card : object = {
				"user": this.getUser(),
				"title": this.getTitle(),
				"inclusion_time": this.getInclusionTime(),
				"deadline": this.getDeadline(),
				"text": this.getText()
			}
			cards_array.push(new_card)
			console.log(cards_array)
			const new_cards_data_string : string = JSON.stringify(cards_array)
			fs.writeFile(file_path, new_cards_data_string, (err) => {
				if (err) console.error(err)
			})
			const message : string =  'Lembrete cadastrado com sucesso'
			console.log(message)
			res.json({ "message": message })
		})
	}

}
