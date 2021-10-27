import { Context, Next } from "koa";

export type MethodFunction = (ctx: Context, next: Next) => Promise<void>;

export interface MethodData {
    methodName: string
    methodParam: string
    methodFunc: MethodFunction 
}