import express, { Request, Response } from 'express'

import { Card } from '../../models/Card/Card'

export const CriarLembreteController = (req: Request, res: Response) => {
	const title = req.body.title
	const inclusion_time = req.body.inclusion_time
	const deadline = req.body.deadline
	const text = req.body.text
	const card = new Card (
		title,
		inclusion_time,
		deadline,
		text
	)
	card.save(res)
}
