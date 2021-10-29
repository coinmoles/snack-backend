import Ajv, { JSONSchemaType } from "ajv";

const ajv = new Ajv();

interface Ctx {
    imgUrl: string
}

const schema: JSONSchemaType<Ctx> = {
    type: "object",
    properties: {
        imgUrl: {type: "string"}
    },
    required: ["imgUrl"],
    additionalProperties: true
}

export const postValidate = ajv.compile(schema);