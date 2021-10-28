import mongoose, { Model } from "mongoose";
import { DB_CONNECTION_URI } from "../../secret";
import { SnackData } from "../interface/SnackData";

const connection = mongoose.createConnection(DB_CONNECTION_URI);

const SnackDataSchema = new mongoose.Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true
    },
    day: {
        type: Number,
        required: true
    },
    snack: {
        type: String,
        required: true
    },
});

SnackDataSchema.set("toJSON", {
    transform(_doc, returned) {
        const returnedDocument = JSON.stringify(returned);
        const document = JSON.parse(returnedDocument);
        document.id = returned._id;

        delete document._id;
        delete document.__v;

        return document;
    }
});

export const SnackModel: Model<SnackData> = connection.model("Snack Data", SnackDataSchema);