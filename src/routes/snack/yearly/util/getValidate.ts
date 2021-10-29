import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Ctx {
    year: number
}

const schema: JSONSchemaType<Ctx> = {
    type: "object",
    properties: {
        year: { type: "number" }
    },
    required: ["year"],
    additionalProperties: true
}

export const getValidate = ajv.compile(schema);