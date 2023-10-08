"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SairController = void 0;
const fs_1 = __importDefault(require("fs"));
const SairController = (req, res) => {
    fs_1.default.writeFileSync('sessao.txt', '');
    const message = 'Sessão encerrada com sucesso';
    console.log(message);
    res.json({ "message": message });
};
exports.SairController = SairController;
