import { Context, Next } from "koa";
import { withAuth } from "../../../util/helper/withAuth";
import { imageToSnack } from "../../../util/imageToSnack";
import { postValidate } from "./util/postValidate";

const postFunc = async (ctx: Context, next: Next): Promise<void> => {
    if (!postValidate(ctx.request.body)) {
        ctx.response.status = 400;
        ctx.response.message = "Invalid Body Type";

        await next();
        return;
    }

    const { imgUrl } = ctx.request.body;
    try {
        await imageToSnack(imgUrl);
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
export const methodParam = "/";
export const methodFunc = withAuth(postFunc);