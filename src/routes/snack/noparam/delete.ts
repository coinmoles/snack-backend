import { Context, Next } from "koa";
import { dbRead, dbRemove } from "../../../util/dbRelated/SnackRepo";
import { deleteValidate } from "./util/deleteValidate";

const deleteFunc = async (ctx: Context, next: Next): Promise<void> => {
    if (!deleteValidate(ctx.request.body)) {
        ctx.response.status = 400;
        ctx.response.message = "Invalid Body Type";

        await next();
        return;
    }

    const { year, month, day } = ctx.request.body;
    try {
        const snackDatas = await dbRemove({ year, month, day });
        ctx.response.status = 204
    } catch (err){
        ctx.response.status = 500;
        ctx.response.message = "Something Went Wrong"
        await next();
        return;
    }

    await next();
    return;
}

export const methodName = "delete";
export const methodParam = "/";
export { deleteFunc as methodFunc };