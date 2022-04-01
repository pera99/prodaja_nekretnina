"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationController = void 0;
const locations_1 = __importDefault(require("../models/locations"));
const microlocations_1 = __importDefault(require("../models/microlocations"));
class LocationController {
    constructor() {
        this.getCities = (req, res) => {
            let query = locations_1.default.find({}).select('name -_id');
            query.exec((err, cities) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(cities);
                }
            });
        };
        this.getMunicipalitiesForCity = (req, res) => {
            let city = req.body.city;
            if (city == undefined) {
                res.status(400).json({ error: "Data mising!" });
            }
            let query = locations_1.default.find({ name: city }).select("municipalities -_id");
            console.log("OVDE");
            query.exec((err, municipalities) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(municipalities);
                    res.status(200).json(municipalities);
                }
            });
        };
        this.getMicrolocationsForCityAndMunicipality = (req, res) => {
            let city = req.body.city;
            let municipality = req.body.municipality;
            if (city == undefined || municipality == undefined) {
                res.status(400).json({ error: "Data mising!" });
            }
            let query = microlocations_1.default.find({ city: city, municipality: municipality }).select("name -_id");
            query.exec((err, microlocations) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(microlocations);
                    res.status(200).json(microlocations);
                }
            });
        };
        this.addMicrolocation = (req, res) => {
            let city = req.body.city;
            let municipality = req.body.municipality;
            let new_microlocation = req.body.new_microlocation;
            if (city == undefined || municipality == undefined || new_microlocation == undefined) {
                res.status(400).json({ error: "Data mising!" });
            }
            let new_mic = new microlocations_1.default({ city: city, municipality: municipality, name: new_microlocation, streets: [] });
            new_mic.save(function (err, m) {
                if (err) {
                    console.error(err);
                }
                else {
                    console.log(m + " saved!.");
                    res.status(200).json({ "message": "ok" });
                }
            });
        };
        this.addStreetToMicrolocation = (req, res) => {
            let city = req.body.city;
            let municipality = req.body.municipality;
            let microlocation = req.body.microlocation;
            let new_street = req.body.new_street;
            if (city == undefined || municipality == undefined || microlocation == undefined || new_street == undefined) {
                res.status(400).json({ error: "Data mising!" });
            }
            microlocations_1.default.findOneAndUpdate({ city: city, municipality: municipality, name: microlocation }, { $push: { streets: new_street } }, (err, m) => {
                if (err) {
                    console.error(err);
                }
                else {
                    res.status(200).json({ "message": "ok" });
                }
            });
        };
        this.getMicrolocations = (req, res) => {
            let query = microlocations_1.default.find({});
            query.exec((err, microlocations) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json(microlocations);
                }
            });
        };
        this.deleteMicrolocation = (req, res) => {
            let city = req.body.city;
            let municipality = req.body.municipality;
            let name = req.body.name;
            if (city == undefined || municipality == undefined || name == undefined) {
                res.status(400).json({ error: "Data mising!" });
            }
            microlocations_1.default.findOneAndDelete({ city: city, municipality: municipality, name: name }, (err, m) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.status(200).json({ "message": "ok" });
                }
            });
        };
        this.getMunicipalities = (req, res) => {
            let query = locations_1.default.find({}).select("municipalities");
            query.exec((err, microlocations) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(microlocations);
                    res.status(200).json(microlocations);
                }
            });
        };
    }
}
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map