"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CriarLembreteController = void 0;
const Card_1 = require("../../models/Card/Card");
const CriarLembreteController = (req, res) => {
    const title = req.body.title;
    const inclusion_time = req.body.inclusion_time;
    const deadline = req.body.deadline;
    const text = req.body.text;
    const card = new Card_1.Card(title, inclusion_time, deadline, text);
    card.save(res);
};
exports.CriarLembreteController = CriarLembreteController;
