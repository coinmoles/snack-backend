import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Ctx {
    year: number,
    month: number,
    day: number
}

const schema: JSONSchemaType<Ctx> = {
    type: "object",
    properties: {
        year: { type: "number" },
        month: { type: "number" },
        day: { type: "number" }
    },
    required: ["year", "month", "day"],
    additionalProperties: true
}

export const deleteValidate = ajv.compile(schema);