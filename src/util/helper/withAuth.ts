import { MethodFunction } from "../interface/MethodData";

export const withAuth = (methodFunc: MethodFunction): MethodFunction => {
    return async (ctx, next) => {
        if (ctx.request.headers['x-api-key'] !== process.env.API_KEY) {
            ctx.response.status = 401;
            await next();
            return;
        }
        else{
            await methodFunc(ctx, next);
        }
    }
}