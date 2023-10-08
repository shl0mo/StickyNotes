"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListStickyNotesController = void 0;
const fs_1 = __importDefault(require("fs"));
const lodash_1 = __importDefault(require("lodash"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const CARDS_DOCUMENT = process.env.CARDS_DOCUMENT;
const ListStickyNotesController = (req, res) => {
    const file_path = `./src/database/${CARDS_DOCUMENT}`;
    fs_1.default.readFile(file_path, 'utf-8', (err, data) => {
        if (err)
            throw err;
        const username = fs_1.default.readFileSync('sessao.txt', 'utf-8');
        const data_objects_array = JSON.parse(data);
        const filtered_data = lodash_1.default.filter(data_objects_array, { "user": username });
        // console.log(filtered_data)
        res.json({ "data_array": filtered_data });
    });
};
exports.ListStickyNotesController = ListStickyNotesController;
