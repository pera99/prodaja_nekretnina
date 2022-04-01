"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const agency_controller_1 = require("../controllers/agency.controller");
const agencyRouter = express_1.default.Router();
agencyRouter.route('/add').post((req, res) => {
    new agency_controller_1.AgencyController().addAgency(req, res);
});
agencyRouter.route('/agencies').get((req, res) => {
    new agency_controller_1.AgencyController().getAgencies(req, res);
});
agencyRouter.route('/getAgency').post((req, res) => {
    new agency_controller_1.AgencyController().getAgency(req, res);
});
exports.default = agencyRouter;
//# sourceMappingURL=agency.routes.js.map