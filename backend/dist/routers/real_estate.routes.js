"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const real_estate_controller_1 = require("../controllers/real_estate.controller");
const realEstateRouter = express_1.default.Router();
realEstateRouter.route('/addRealEstate').post((req, res) => {
    new real_estate_controller_1.RealEstateController().addRealEstate(req, res);
});
realEstateRouter.route('/getRealEstatesForAdvertiser').post((req, res) => {
    new real_estate_controller_1.RealEstateController().getRealEstate(req, res);
});
realEstateRouter.route('/sellRealEstate').post((req, res) => {
    new real_estate_controller_1.RealEstateController().sellRealEstate(req, res);
});
realEstateRouter.route('/updateRealEstate').post((req, res) => {
    new real_estate_controller_1.RealEstateController().updateRealEstate(req, res);
});
realEstateRouter.route('/searchRealEstate').post((req, res) => {
    new real_estate_controller_1.RealEstateController().searchRealEstate(req, res);
});
realEstateRouter.route('/addToFavorites').post((req, res) => {
    new real_estate_controller_1.RealEstateController().addToFavorites(req, res);
});
realEstateRouter.route('/getFavorites').post((req, res) => {
    new real_estate_controller_1.RealEstateController().getFavorites(req, res);
});
realEstateRouter.route('/removeFromFavorites').post((req, res) => {
    new real_estate_controller_1.RealEstateController().removeFromFavorites(req, res);
});
realEstateRouter.route('/searchRealEstateAdvanced').post((req, res) => {
    new real_estate_controller_1.RealEstateController().searchRealEstateAdvanced(req, res);
});
realEstateRouter.route('/get5LastAdvertised').get((req, res) => {
    new real_estate_controller_1.RealEstateController().get5LastAdvertised(req, res);
});
realEstateRouter.route('/addRealEstateJSON').post((req, res) => {
    new real_estate_controller_1.RealEstateController().addRealEstateJSON(req, res);
});
realEstateRouter.route('/getAvgPrice').post((req, res) => {
    new real_estate_controller_1.RealEstateController().getAvgPrice(req, res);
});
exports.default = realEstateRouter;
//# sourceMappingURL=real_estate.routes.js.map