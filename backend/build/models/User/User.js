"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = __importDefault(require("dotenv"));
const lodash_1 = __importDefault(require("lodash"));
dotenv_1.default.config();
const USERS_DOCUMENT = process.env.USERS_DOCUMENT;
class User {
    constructor(username, password) {
        this.username = '';
        this.password = '';
        this.setUsername(username);
        this.setPassword(password);
    }
    setUsername(username) {
        this.username = username;
    }
    getUsername() {
        return this.username;
    }
    setPassword(password) {
        this.password = password;
    }
    getPassword() {
        return this.password;
    }
    save(res) {
        const file_path = `./src/database/${USERS_DOCUMENT}`;
        fs_1.default.readFile(file_path, 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const users_array = JSON.parse(data);
            if (lodash_1.default.find(users_array, { "username": this.getUsername() })) {
                console.log('erro: usuário já cadastrado');
                res.json({ "message": 'Erro: nome de usuário já cadastrado. Escolha outro' });
                return;
            }
            const new_username = this.getUsername();
            const new_password = this.getPassword();
            const new_user = {
                "username": new_username,
                "password": new_password
            };
            users_array.push(new_user);
            const new_users_data_string = JSON.stringify(users_array);
            fs_1.default.writeFile(file_path, new_users_data_string, (err) => {
                if (err)
                    console.error(err);
            });
            console.log('sucesso');
            res.json({ "message": 'Usuário cadastrado com sucesso' });
        });
    }
}
exports.User = User;
