import { Context, Next } from "koa";
import { dbRead } from "../../../util/dbRelated/SnackRepo";
import { getValidate } from "./util/getValidate";

const getFunc = async (ctx: Context, next: Next): Promise<void> => {
    if (!getValidate(ctx.request.body)) {
        ctx.response.status = 400;
        ctx.response.message = "Invalid Body Type";

        await next();
        return;
    }

    const { year, month, day } = ctx.request.body;
    try {
        const snackDatas = await dbRead({ year, month, day });
        ctx.response.status = 200
        ctx.response.body = snackDatas.map(snackData => {
            return {
                year: snackData.year,
                month: snackData.month,
                day: snackData.day,
                snack: snackData.snack
            }
        });
    } catch (err){
        ctx.response.status = 500;
        ctx.response.message = "Something Went Wrong"
        await next();
        return;
    }

    await next();
    return;
}

export const methodName = "get";
export const methodParam = "/";
export { getFunc as methodFunc };