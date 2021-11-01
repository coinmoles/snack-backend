import { Context, Next } from "koa";
import { dbCreate } from "../../../util/dbRelated/SnackRepo";
import { withAuth } from "../../../util/helper/withAuth";
import { postValidate } from "./util/postValidate";

const postFunc = async (ctx: Context, next: Next): Promise<void> => {
    if (!postValidate(ctx.request.body)) {
        ctx.response.status = 400;
        ctx.response.message = "Invalid Body Type";

        await next();
        return;
    }

    const { year, month, day, snack } = ctx.request.body;
    try {
        await dbCreate({ year, month, day, snack });
        ctx.response.status = 201;
    } catch (err){
        ctx.response.status = 500;
        ctx.response.message = "Something Went Wrong"
        await next();
        return;
    }

    await next();
    return;
}

export const methodName = "post";
export const methodParam = "/daily";
export const methodFunc = withAuth(postFunc);