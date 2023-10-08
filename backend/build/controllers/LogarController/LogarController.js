"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogarController = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const USERS_DOCUMENT = process.env.USERS_DOCUMENT;
const LogarController = (req, res) => {
    const file_path = `./src/database/${USERS_DOCUMENT}`;
    const username = req.body.username;
    const password = req.body.password;
    fs_1.default.readFile(file_path, 'utf-8', (err, data) => {
        const users_array = JSON.parse(data);
        if (lodash_1.default.find(users_array, { "username": username, "password": password })) {
            fs_1.default.writeFileSync('sessao.txt', username);
            const message = 'Login realizado com sucesso';
            res.json({ "message": message });
        }
        else {
            const message = "Usuário ou senha inválidos";
            res.json({ "message": message });
        }
    });
};
exports.LogarController = LogarController;
