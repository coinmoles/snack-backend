import { Context, Next } from "koa";
import { DateTime } from "luxon";
import { getValidate } from "./util/getValidate";

const getFunc = async (ctx: Context, next: Next): Promise<void> => {
    if (!getValidate(ctx.request.body)) {
        ctx.response.status = 400;
        ctx.response.message = "Invalid Body Type";

        await next();
        return;
    }

    const { year, month, day } = ctx.request.body;
    const date = DateTime.fromObject({ year, month, day }).toFormat("yyyyLLLdd")

    ctx.response.status = 200
}

export const methodName = "get";
export const methodParam = "/";
export { getFunc as methodFunc };