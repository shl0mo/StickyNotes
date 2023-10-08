import express, { Request, Response } from 'express'
import { CadastrarController } from '../controllers/CadastrarController/CadastrarController'
import { LogarController } from '../controllers/LogarController/LogarController'
import { SairController } from '../controllers/SairController/SairController'
import { CheckSessionController } from '../controllers/CheckSessionController/CheckSessionController'
import { CriarLembreteController } from '../controllers/CriarLembreteController/CriarLembreteController'
import { ListStickyNotesController } from '../controllers/ListStickyNotesController/ListStickyNotesController'
import { ExcluirLembreteController } from '../controllers/ExcluirLembreteController/ExcluirLembreteController'
import { AlterarLembreteController } from '../controllers/AlterarLembreteController/AlterarLembreteController'

const request = express.Router()


request.post('/logar', LogarController)

request.post('/cadastrar', CadastrarController)

request.post('/sair', SairController)

request.post('/checkSession', CheckSessionController)

request.post('/criarLembrete', CriarLembreteController)

request.post('/listStickyNotes', ListStickyNotesController)

request.post('/excluirLembrete', ExcluirLembreteController)

request.post('/alterarLembrete', AlterarLembreteController)

export default request
