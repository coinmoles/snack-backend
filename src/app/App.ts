import Koa from "koa";
import logger from "koa-logger"
import bodyParser from "koa-bodyparser";
import Router from "koa-router";
import { promisify } from "util";
import { glob } from "glob";
import { RouteData } from "../util/interface/RouteData";
import { createRouter } from "../util/helper/createRouter";
import { PORT } from "../secret";

const globPromise = promisify(glob);

class App extends Koa {
    private router = new Router();

    public async start(): Promise<void> {
        this.use(logger());
        this.use(bodyParser());
        this.use(this.router.routes()); 
        
        const routeFiles: string[] = await globPromise(`${__dirname}/../routes/**/index{.js,.ts}`);
        await routeFiles.map(async (routerPath: string) => {
            const routeData: RouteData = await import(routerPath);
            const router = await createRouter(`${routerPath}/..`);
            
            this.router.use(routeData.route, router.routes());
        });

        await this.listen(PORT);

        console.log("The App is Running!")
    }
}

export { App }