"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexController = void 0;
class IndexController {
    getPing(req, res) {
        res.send('Pong');
    }
    getIndex(req, res) {
        res.send('Hello, World!');
    }
}
exports.IndexController = IndexController;
//# sourceMappingURL=index.js.map