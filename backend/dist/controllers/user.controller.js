"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
const sizeOf = require('image-size');
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password, 'valid': true }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(user);
                }
            });
        };
        this.register = (req, res) => {
            req.body.valid = false;
            if (req.body.image == undefined || req.body.firstname == undefined || req.body.lastname == undefined || req.body.username == undefined || req.body.password == undefined || req.body.confirm_password == undefined || req.body.city == undefined || req.body.telephone == undefined || req.body.email == undefined || req.body.birthday == undefined || req.body.type == undefined) {
                res.status(400).json({ "error": "Missing data!" });
                return;
            }
            let image_format = req.body.image.substring(11, 15);
            console.log(image_format);
            if (image_format != "png;" && image_format != "jpg;" && image_format != "jpeg") {
                res.status(400).json({ "error": "Image in wrong format!" });
                return;
            }
            let password = req.body.password;
            let start_with_letter = /^([A-Za-z])/.test(password);
            let contain_number = /\d/.test(password);
            let contain_upper = /[A-Z]/.test(password);
            let contain_special = /[^A-Za-z 0-9]/.test(password);
            if (!start_with_letter || !contain_number || !contain_special || !contain_upper || password.length < 8) {
                res.status(400).json({ "error": "password" });
                return;
            }
            // image check
            let img;
            if (image_format == "png;") {
                img = Buffer.from(req.body.image.substring(22), "base64");
            }
            else if (image_format == "jpg;" || image_format == "jpeg") {
                img = Buffer.from(req.body.image.substring(23), "base64");
            }
            let dimensions = sizeOf(img);
            console.log(dimensions.width, dimensions.height);
            if (dimensions.width < 100 || dimensions.height > 300) {
                res.status(400).json({ "error": "Image dimension must be 100x100 to 300x300!" });
                return;
            }
            if (dimensions.height < 100 || dimensions.height > 300) {
                res.status(400).json({ "error": "Image dimension must be 100x100 to 300x300!" });
                return;
            }
            //image check
            let user = new user_1.default(req.body);
            console.log(user);
            user.save().then(user => {
                res.status(200).json({ 'message': 'ok' });
            }).catch(err => {
                console.log(err);
                if (err.keyValue.username) {
                    res.status(400).json({ "error": "username" });
                }
                else if (err.keyValue.email) {
                    res.status(400).json({ "error": "email" });
                }
                else {
                    res.status(400).json({ "error": "error" });
                }
            });
        };
        this.getRegisterRequests = (req, res) => {
            user_1.default.find({ 'valid': false }, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(users);
                }
            });
        };
        this.getUsers = (req, res) => {
            user_1.default.find({ 'valid': true, 'type': { $ne: 'admin' } }, (err, users) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(users);
                }
            });
        };
        this.acceptRegistration = (req, res) => {
            let username = req.body.username;
            if (username == undefined) {
                res.status(400).json({ "error": "Missing data!" });
                return;
            }
            user_1.default.findOneAndUpdate({ 'username': username }, { 'valid': true }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ 'message': 'ok' });
                }
            });
        };
        this.deleteUser = (req, res) => {
            let username = req.body.username;
            if (username == undefined) {
                res.status(400).json({ "error": "Missing data!" });
                return;
            }
            user_1.default.deleteOne({ 'username': username }, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ 'message': 'ok' });
                }
            });
        };
        this.addUser = (req, res) => {
            req.body.valid = true;
            console.log(req.body);
            let user = new user_1.default(req.body);
            user.save().then(user => {
                res.status(200).json({ 'message': 'ok' });
            }).catch(err => {
                //console.log(err);
                if (err.keyValue.username) {
                    res.status(400).json({ "error": "username" });
                }
                else if (err.keyValue.email) {
                    res.status(400).json({ "error": "email" });
                }
                else {
                    res.status(400).json({ "error": "error" });
                }
            });
        };
        this.updateUser = (req, res) => {
            let username = req.body.username;
            let new_phone = req.body.new_phone;
            let new_birthday = req.body.new_birthday;
            if (username == undefined || new_phone == undefined || new_birthday == undefined) {
                res.status(400).json({ "error": "Missing data!" });
                return;
            }
            let update = {
                telephone: new_phone,
                birthday: new_birthday
            };
            console.log(req.body);
            user_1.default.findOneAndUpdate({ 'username': username }, update, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("UPDEJT!");
                    res.status(200).json({ 'message': 'ok' });
                }
            });
        };
        this.changePassword = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            let new_password = req.body.new_password;
            if (username == undefined || password == undefined || new_password == undefined) {
                res.status(400).json({ "error": "Missing data!" });
                return;
            }
            let start_with_letter = /^([A-Za-z])/.test(new_password);
            let contain_number = /\d/.test(new_password);
            let contain_upper = /[A-Z]/.test(new_password);
            let contain_special = /[^A-Za-z 0-9]/.test(new_password);
            if (!start_with_letter || !contain_number || !contain_special || !contain_upper || password.length < 8) {
                res.status(400).json({ "error": "Password - wrong format!" });
                return;
            }
            let update = {
                password: new_password,
                confirm_password: new_password
            };
            console.log(req.body);
            user_1.default.findOneAndUpdate({ 'username': username, "password": password }, update, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("UPDEJT!");
                    res.status(200).json({ 'message': 'ok' });
                }
            });
        };
        this.updateAdvertiser = (req, res) => {
            let username = req.body.username;
            let new_phone = req.body.new_phone;
            let new_email = req.body.new_email;
            //console.log(new_phone);
            //console.log(new_email);
            let update = {};
            if (new_phone != undefined || new_phone != "") {
                update["telephone"] = new_phone;
            }
            if (new_email != undefined || new_email != "") {
                update["email"] = new_email;
            }
            //console.log(update);
            user_1.default.findOneAndUpdate({ 'username': username }, update, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("UPDEJT!");
                    res.status(200).json({ 'message': 'ok' });
                }
            });
        };
        this.updateAdvertiserAgency = (req, res) => {
            let username = req.body.username;
            let new_agency = req.body.new_agency;
            let new_licence_number = req.body.new_licence_number;
            if (username == undefined) {
                res.status(400).json({ error: 'Data mising!' });
            }
            let update = { advertiserType: "agent" };
            if (new_agency != undefined) {
                update["agency"] = new_agency;
            }
            if (new_licence_number != undefined) {
                update["licence"] = new_licence_number;
            }
            console.log(update);
            user_1.default.findOneAndUpdate({ 'username': username }, update, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("UPDEJT!");
                    res.status(200).json({ 'message': 'ok' });
                }
            });
        };
        this.getAdvertiser = (req, res) => {
            console.log(req.body.username);
            user_1.default.findOne({ username: req.body.username }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(user);
                    res.status(200).json(user);
                }
            });
        };
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map