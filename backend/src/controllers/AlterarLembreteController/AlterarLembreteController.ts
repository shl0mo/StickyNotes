import express, { Request, Response } from 'express'
import fs from 'fs'
import _ from 'lodash'
import dotenv from 'dotenv'

dotenv.config()

const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT

type Card = {
	"user": string,
	"title": string,
	"inclusion_time": string,
	"deadline": string,
	"text": string
}

export const AlterarLembreteController = (req : Request, res: Response) => {
	const title_before_update : string = req.body.title_before_update
	const inclusion_time_before_update : string = req.body.inclusion_time_before_update
	const deadline_before_update : string = req.body.deadline_before_update
	const text_before_update : string = req.body.text_before_update
	const user : string = fs.readFileSync('sessao.txt', 'utf-8')
	const title : string = req.body.title
	const inclusion_time : string = req.body.inclusion_time
	const deadline : string = req.body.deadline
	const text : string = req.body.text
	const file_path = `./src/database/${CARDS_DOCUMENT}`
	fs.readFile(file_path, 'utf-8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}
		const updated_card : Card = {
			"user": user,
			"title": title,
			"inclusion_time": inclusion_time,
			"deadline": deadline,
			"text": text
		}
		const data_array : Card[] = JSON.parse(data)
		for (let i = 0; i < data_array.length; i++) {
			let card = data_array[i]
			const same_user : boolean = card.user === user
			const same_title : boolean = card.title === title_before_update
			const same_inclusion_time : boolean = card.inclusion_time === inclusion_time_before_update
			const same_deadline : boolean = card.deadline === deadline_before_update
			const same_text : boolean = card.text === text_before_update
			if (same_user && same_title && same_inclusion_time && same_deadline && same_text) {
				console.log('Updating card...')
				card.title = title
				card.inclusion_time = inclusion_time
				card.deadline = deadline
				card.text = text
			}	
		}
		const new_data_array_string : string = JSON.stringify(data_array)
		fs.writeFile(file_path, new_data_array_string, (err) => {
			if (err) console.error(err)
		})
		console.log('Lembrete alterado com sucesso')
		res.json({ "message": 'sucesso' })
	})
}
