import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Ctx {
}

const schema: JSONSchemaType<Ctx> = {
    type: "object",
    properties: {
    },
    required: [],
    additionalProperties: true
}

export const getValidate = ajv.compile(schema);