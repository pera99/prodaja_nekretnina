"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_routes_1 = __importDefault(require("./routers/user.routes"));
const agency_routes_1 = __importDefault(require("./routers/agency.routes"));
const location_routes_1 = __importDefault(require("./routers/location.routes"));
const real_estate_routes_1 = __importDefault(require("./routers/real_estate.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
mongoose_1.default.connect('mongodb://localhost:27017/prodaja_nekretnina');
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log("db connection ok!");
});
const router = express_1.default.Router();
router.use('/users', user_routes_1.default);
router.use('/agencies', agency_routes_1.default);
router.use('/locations', location_routes_1.default);
router.use('/realestates', real_estate_routes_1.default);
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map