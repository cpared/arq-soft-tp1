"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const controllers_1 = require("../controllers");
function setRoutes(router) {
    const indexController = new controllers_1.IndexController();
    router.get('/', (req, res) => {
        indexController.getIndex(req, res);
    });
    router.get('/ping', (req, res) => {
        // indexController.getPing(req, res);
        res.send('Pong');
    });
}
exports.setRoutes = setRoutes;
//# sourceMappingURL=index.js.map