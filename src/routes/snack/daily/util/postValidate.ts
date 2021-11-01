import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Ctx {
    year: number,
    month: number,
    day: number,
    snack: string
}

const schema: JSONSchemaType<Ctx> = {
    type: "object",
    properties: {
        year: { type: "number" },
        month: { type: "number" },
        day: { type: "number" },
        snack: { type: "string" }
    },
    required: ["year", "month", "day", "snack"],
    additionalProperties: true
}

export const postValidate = ajv.compile(schema);