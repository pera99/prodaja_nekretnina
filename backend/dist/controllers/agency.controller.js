"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgencyController = void 0;
const agency_1 = __importDefault(require("../models/agency"));
class AgencyController {
    constructor() {
        this.getAgencies = (req, res) => {
            agency_1.default.find({}, (err, agencies) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(agencies);
                    res.status(200).json(agencies);
                }
            });
        };
        this.addAgency = (req, res) => {
            let agency = new agency_1.default(req.body);
            // polja su required , mora da ih ima , moze bez provere
            agency.save().then(agency => {
                res.status(200).json({ 'message': 'ok' });
            }).catch(err => {
                console.log(err);
            });
        };
        this.getAgency = (req, res) => {
            agency_1.default.findOne({ name: req.body.name }, (err, agencies) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(agencies);
                    res.status(200).json(agencies);
                }
            });
        };
    }
}
exports.AgencyController = AgencyController;
//# sourceMappingURL=agency.controller.js.map