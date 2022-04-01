"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Microlocation = new Schema({
    city: {
        type: String
    },
    municipality: {
        type: String
    },
    name: {
        type: String
    },
    streets: {
        type: [String]
    },
    advertised_number: {
        type: Number,
        default: 0
    }
});
exports.default = mongoose_1.default.model("Microlocation", Microlocation, "microlocations");
//# sourceMappingURL=microlocations.js.map