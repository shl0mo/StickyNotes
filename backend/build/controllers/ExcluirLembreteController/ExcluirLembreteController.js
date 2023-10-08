"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExcluirLembreteController = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT;
const ExcluirLembreteController = (req, res) => {
    const user = fs_1.default.readFileSync('sessao.txt', 'utf-8');
    const title = req.body.title;
    const inclusion_time = req.body.inclusion_time;
    const deadline = req.body.deadline;
    const text = req.body.text;
    const file_path = `./src/database/${CARDS_DOCUMENT}`;
    fs_1.default.readFile(file_path, 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const data_array = JSON.parse(data);
        console.log(data_array.length);
        lodash_1.default.remove(data_array, {
            "user": user,
            "title": title,
            "inclusion_time": inclusion_time,
            "deadline": deadline,
            "text": text
        });
        console.log(data_array.length);
        const new_data_array_string = JSON.stringify(data_array);
        fs_1.default.writeFile(file_path, new_data_array_string, (err) => {
            if (err)
                console.error(err);
        });
        console.log('Lembrete excluído com sucesso');
        res.json({ "message": 'sucesso' });
    });
};
exports.ExcluirLembreteController = ExcluirLembreteController;
