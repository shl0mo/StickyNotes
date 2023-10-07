import express, { Request, Response } from 'express'
import fs from 'fs'
import _ from 'lodash'
import dotenv from 'dotenv'

dotenv.config()

const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT

export const ListStickyNotesController = (req : Request, res : Response) : void => {
	const file_path = `./src/database/${CARDS_DOCUMENT}`
	fs.readFile(file_path, 'utf-8', (err, data) => {
		if (err) throw err
		// const username : string = fs.readFileSync('sessao.txt', 'utf-8')
		const data_objects_array = JSON.parse(data)
		const filtered_data = _.filter(data_objects_array, { "user": username })
		// console.log(filtered_data)
		res.json({ "data_array": filtered_data })
	})
}
