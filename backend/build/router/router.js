"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CadastrarController_1 = require("../controllers/CadastrarController/CadastrarController");
const LogarController_1 = require("../controllers/LogarController/LogarController");
const SairController_1 = require("../controllers/SairController/SairController");
const CheckSessionController_1 = require("../controllers/CheckSessionController/CheckSessionController");
const CriarLembreteController_1 = require("../controllers/CriarLembreteController/CriarLembreteController");
const ListStickyNotesController_1 = require("../controllers/ListStickyNotesController/ListStickyNotesController");
const ExcluirLembreteController_1 = require("../controllers/ExcluirLembreteController/ExcluirLembreteController");
const AlterarLembreteController_1 = require("../controllers/AlterarLembreteController/AlterarLembreteController");
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.end('Inicio');
});
router.post('/logar', LogarController_1.LogarController);
router.post('/cadastrar', CadastrarController_1.CadastrarController);
router.post('/sair', SairController_1.SairController);
router.post('/checkSession', CheckSessionController_1.CheckSessionController);
router.post('/criarLembrete', CriarLembreteController_1.CriarLembreteController);
router.post('/listStickyNotes', ListStickyNotesController_1.ListStickyNotesController);
router.post('/excluirLembrete', ExcluirLembreteController_1.ExcluirLembreteController);
router.post('/alterarLembrete', AlterarLembreteController_1.AlterarLembreteController);
exports.default = router;
