"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/location.controller");
const locationRouter = express_1.default.Router();
/*locationRouter.route('/locations').get((req,res)=>{
    new LocationController().getLocations(req,res);
});*/
locationRouter.route('/getCities').get((req, res) => {
    new location_controller_1.LocationController().getCities(req, res);
});
locationRouter.route('/getMunicipalitiesForCity').post((req, res) => {
    new location_controller_1.LocationController().getMunicipalitiesForCity(req, res);
});
locationRouter.route('/getMicrolocationsForCityAndMunicipality').post((req, res) => {
    new location_controller_1.LocationController().getMicrolocationsForCityAndMunicipality(req, res);
});
locationRouter.route('/addMicrolocation').post((req, res) => {
    new location_controller_1.LocationController().addMicrolocation(req, res);
});
locationRouter.route('/addStreetToMicrolocation').post((req, res) => {
    new location_controller_1.LocationController().addStreetToMicrolocation(req, res);
});
locationRouter.route('/getMicrolocations').get((req, res) => {
    new location_controller_1.LocationController().getMicrolocations(req, res);
});
locationRouter.route('/deleteMicrolocation').post((req, res) => {
    new location_controller_1.LocationController().deleteMicrolocation(req, res);
});
locationRouter.route('/getMunicipalities').get((req, res) => {
    new location_controller_1.LocationController().getMunicipalities(req, res);
});
exports.default = locationRouter;
//# sourceMappingURL=location.routes.js.map