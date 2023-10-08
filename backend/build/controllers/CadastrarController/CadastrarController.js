"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadastrarController = void 0;
const User_1 = require("../../models/User/User");
const CadastrarController = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = new User_1.User(username, password);
    user.save(res);
};
exports.CadastrarController = CadastrarController;
