import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Ctx {
    year: number,
    month: number
}

const schema: JSONSchemaType<Ctx> = {
    type: "object",
    properties: {
        year: { type: "number" },
        month: { type: "number" }
    },
    required: ["year", "month"],
    additionalProperties: true
}

export const getValidate = ajv.compile(schema);