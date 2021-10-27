import Router from "koa-router";
import { promisify } from 'util';
import { glob } from "glob";
import { MethodData } from "../interface/MethodData";

const globPromise = promisify(glob);

export const createRouter = async (dirName: string): Promise<Router> => {
    const router = new Router()

    const routeFiles: string[] = await globPromise(`${dirName}/*/**/*{.js,.ts}`);
    await routeFiles.map(async (methodPath: string) => {
        const methodData: MethodData = await import(methodPath);

        if (methodData.methodName === 'get') {
            router.get(methodData.methodParam, methodData.methodFunc);
        }
        else if (methodData.methodName === 'post') {
            router.post(methodData.methodParam, methodData.methodFunc);
        }
        else if (methodData.methodName === 'put') {
            router.put(methodData.methodParam, methodData.methodFunc);
        }
        else if (methodData.methodName === 'delete') {
            router.delete(methodData.methodParam, methodData.methodFunc);
        }
    });

    return router;
}