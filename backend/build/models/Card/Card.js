"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT;
class Card {
    constructor(title, inclusion_time, deadline, text) {
        this.user = '';
        this.title = '';
        this.inclusion_time = '';
        this.deadline = '';
        this.text = '';
        this.setUser();
        this.setTitle(title);
        this.setInclusionTime(inclusion_time);
        this.setDeadline(deadline);
        this.setText(text);
    }
    setUser() {
        this.user = fs_1.default.readFileSync('sessao.txt', 'utf-8');
    }
    getUser() {
        return this.user;
    }
    setTitle(title) {
        this.title = title;
    }
    getTitle() {
        return this.title;
    }
    setInclusionTime(inclusion_time) {
        this.inclusion_time = inclusion_time;
    }
    getInclusionTime() {
        return this.inclusion_time;
    }
    setDeadline(deadline) {
        this.deadline = deadline;
    }
    getDeadline() {
        return this.deadline;
    }
    setText(text) {
        this.text = text;
    }
    getText() {
        return this.text;
    }
    save(res) {
        const file_path = `./src/database/${CARDS_DOCUMENT}`;
        fs_1.default.readFile(file_path, 'utf-8', (err, data) => {
            if (err)
                res.json({ "message": 'erro' });
            const cards_array = JSON.parse(data);
            const new_card = {
                "user": this.getUser(),
                "title": this.getTitle(),
                "inclusion_time": this.getInclusionTime(),
                "deadline": this.getDeadline(),
                "text": this.getText()
            };
            cards_array.push(new_card);
            console.log(cards_array);
            const new_cards_data_string = JSON.stringify(cards_array);
            fs_1.default.writeFile(file_path, new_cards_data_string, (err) => {
                if (err)
                    res.json({ "message": 'erro' });
            });
            console.log('Lembrete criado com sucesso');
            res.json({ "message": 'sucesso' });
        });
    }
}
exports.Card = Card;
