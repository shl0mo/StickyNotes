"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlterarLembreteController = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT;
const AlterarLembreteController = (req, res) => {
    const title_before_update = req.body.title_before_update;
    const inclusion_time_before_update = req.body.inclusion_time_before_update;
    const deadline_before_update = req.body.deadline_before_update;
    const text_before_update = req.body.text_before_update;
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
        const updated_card = {
            "user": user,
            "title": title,
            "inclusion_time": inclusion_time,
            "deadline": deadline,
            "text": text
        };
        const data_array = JSON.parse(data);
        for (let i = 0; i < data_array.length; i++) {
            let card = data_array[i];
            const same_user = card.user === user;
            const same_title = card.title === title_before_update;
            const same_inclusion_time = card.inclusion_time === inclusion_time_before_update;
            const same_deadline = card.deadline === deadline_before_update;
            const same_text = card.text === text_before_update;
            if (same_user && same_title && same_inclusion_time && same_deadline && same_text) {
                card.title = title;
                card.inclusion_time = inclusion_time;
                card.deadline = deadline;
                card.text = text;
            }
        }
        const new_data_array_string = JSON.stringify(data_array);
        fs_1.default.writeFile(file_path, new_data_array_string, (err) => {
            if (err)
                console.error(err);
        });
        console.log('Lembrete alterado com sucesso');
        res.json({ "message": 'sucesso' });
    });
};
exports.AlterarLembreteController = AlterarLembreteController;
