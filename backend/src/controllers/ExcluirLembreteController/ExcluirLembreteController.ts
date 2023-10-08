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

export const ExcluirLembreteController = (req : Request, res: Response) => {
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
		const data_array : object[] = JSON.parse(data)
		console.log(data_array.length)
		_.remove(data_array, {
			"user": user,
			"title": title,
			"inclusion_time": inclusion_time,
			"deadline": deadline,
			"text": text
		})
		console.log(data_array.length)
		const new_data_array_string : string = JSON.stringify(data_array)
		fs.writeFile(file_path, new_data_array_string, (err) => {
			if (err) console.error(err)
		})
	console.log('Lembrete excluído com sucesso')
	res.json({ "message": 'sucesso' })
	})
}
