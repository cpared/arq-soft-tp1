import { Router } from "express";
class GetRouter {
    constructor() {
        this.router = Router();
        this.routes();
    }
    async getPing(req, res) {
        res.json('ping');
    }
    routes() {
        this.router.get('/ping', this.getPing);
    }
}
const apiRouter = new GetRouter();
export default apiRouter.router;
//# sourceMappingURL=apiRouter.js.map