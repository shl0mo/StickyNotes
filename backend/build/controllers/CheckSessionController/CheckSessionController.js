"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckSessionController = void 0;
const fs_1 = __importDefault(require("fs"));
const CheckSessionController = (req, res) => {
    fs_1.default.readFile('sessao.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.json({ 'user': data });
    });
};
exports.CheckSessionController = CheckSessionController;
