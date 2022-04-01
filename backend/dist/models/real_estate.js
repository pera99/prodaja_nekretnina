"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let RealEstate = new Schema({
    Name: {
        type: String,
        required: true
    },
    Type: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    Municipality: {
        type: String,
        required: true
    },
    Microlocation: {
        type: String,
        required: true
    },
    Street: {
        type: String,
        required: true
    },
    Area: {
        type: Number,
        required: true
    },
    Rooms: {
        type: Number,
        required: true
    },
    ConstructionYear: {
        type: Number,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    Heating: {
        type: String,
        required: true
    },
    Floor: {
        type: Number,
        required: true
    },
    TotalFloors: {
        type: Number,
        required: true
    },
    Parking: {
        type: String,
        required: true
    },
    MonthlyUtilities: {
        type: Number,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    About: {
        type: String,
        required: true
    },
    Characteristics: {
        type: [String]
    },
    Lines: {
        type: [String]
    },
    Advertiser: {
        type: String
    },
    advertiserType: {
        type: String
    },
    Sold: {
        type: Boolean
    },
    LastModified: {
        type: Date
    },
    Favorites: {
        type: [String]
    },
    AdvertisedDate: {
        type: Date
    },
    Images: {
        type: [String],
        required: true
    }
});
exports.default = mongoose_1.default.model("RealEstate", RealEstate, "real_estates");
//# sourceMappingURL=real_estate.js.map