import express, { Request, Response } from 'express'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()
const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT


export class Card {
	private user: string = ''
	private title : string = ''
	private inclusion_time: string = ''
	private deadline : string = ''
	private text : string = ''

	constructor (title : string, inclusion_time : string, deadline : string, text : string) {
		this.setUser()
		this.setTitle(title)
		this.setInclusionTime(inclusion_time)
		this.setDeadline(deadline)
		this.setText(text)
	}

	public setUser () : void {
		this.user = fs.readFileSync('sessao.txt', 'utf-8')
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
			if (err) res.json({ "message": 'erro' })
			const cards_array : object[] = JSON.parse(data)
			const new_card : object = {
				"user": this.getUser(),
				"title": this.getTitle(),
				"inclusion_time": this.getInclusionTime(),
				"deadline": this.getDeadline(),
				"text": this.getText()
			}
			cards_array.push(new_card)
			const new_cards_data_string : string = JSON.stringify(cards_array)
			fs.writeFile(file_path, new_cards_data_string, (err) => {
				if (err) res.json({ "message": 'erro' })
			})
			console.log('Lembrete criado com sucesso')
			res.json({ "message": 'sucesso' })
		})
	}

}
