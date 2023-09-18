import { Request, Response, Router } from "express";

class GetRouter {
    router: Router;

    constructor(){
        this.router = Router();
        this.routes();
    }

    async getPing(req: Request, res: Response){
        res.json('ping');
    }

    routes(){
        this.router.get('/ping', this.getPing);
    }
}

const apiRouter = new GetRouter();
export default apiRouter.router;