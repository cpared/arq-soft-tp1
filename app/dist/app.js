"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setupMiddleware();
        (0, routes_1.setRoutes)(this.app);
    }
    setupMiddleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    start(port) {
        this.app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }
}
exports.App = App;
const app = new App();
app.start(3000);
//# sourceMappingURL=app.js.map