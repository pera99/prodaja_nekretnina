"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const userRouter = express_1.default.Router();
userRouter.route('/login').post((req, res) => {
    new user_controller_1.UserController().login(req, res);
});
userRouter.route('/register').post((req, res) => {
    new user_controller_1.UserController().register(req, res);
});
userRouter.route('/requests').get((req, res) => {
    new user_controller_1.UserController().getRegisterRequests(req, res);
});
userRouter.route('/users').get((req, res) => {
    new user_controller_1.UserController().getUsers(req, res);
});
userRouter.route('/accept').post((req, res) => {
    new user_controller_1.UserController().acceptRegistration(req, res);
});
userRouter.route('/delete').post((req, res) => {
    new user_controller_1.UserController().deleteUser(req, res);
});
userRouter.route('/add').post((req, res) => {
    new user_controller_1.UserController().addUser(req, res);
});
userRouter.route('/update').post((req, res) => {
    new user_controller_1.UserController().updateUser(req, res);
});
userRouter.route('/changePassword').post((req, res) => {
    new user_controller_1.UserController().changePassword(req, res);
});
userRouter.route('/updateAdvertiser').post((req, res) => {
    new user_controller_1.UserController().updateAdvertiser(req, res);
});
userRouter.route('/updateAdvertiserAgency').post((req, res) => {
    new user_controller_1.UserController().updateAdvertiserAgency(req, res);
});
userRouter.route('/getAdvertiser').post((req, res) => {
    new user_controller_1.UserController().getAdvertiser(req, res);
});
exports.default = userRouter;
//# sourceMappingURL=user.routes.js.map