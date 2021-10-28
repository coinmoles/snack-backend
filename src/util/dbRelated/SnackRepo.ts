import { Document, FilterQuery, Query, Types } from "mongoose";
import { SnackModel } from "./SnackModel";
import { SnackData } from "../interface/SnackData";

export const validateId = (id: string): boolean => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('id invalid');
    }

    return true;
}

export const dbCreate = async (data: SnackData | SnackData[]): Promise<Document> => {
    try {

        const snackData = new SnackModel(data);
        return snackData.save();
    } catch (err) {
        throw err;
    }
}

export const dbRead = async (filter?: FilterQuery<SnackData>): Promise<SnackData[]> => {
    try {
        if (filter === undefined) 
            return SnackModel.find();
        else
            return SnackModel.find(filter);
    } catch (err) {
        throw err;
    }
}

export const dbReadById = async (id: string): Promise<Document | null> => {
    try {
        validateId(id);

        return SnackModel.findById(id);
    } catch (err) {
        throw err;
    }
}

export const dbUpdate = async (filter: FilterQuery<SnackData>, data: SnackData): Promise<SnackData | null> => {
    try {
        return SnackModel.findOneAndUpdate(filter, { $set: data })
    } catch (err) {
        throw err;
    }
}

export const dbUpdateById = async (id : string, data: SnackData): Promise<Document | null> => {
    try {
        validateId(id);

        return await SnackModel.findByIdAndUpdate(id, { $set: data });
    } catch (err) {
        throw err;
    }
}

export const dbRemove = async (filter?: FilterQuery<SnackData>): Promise<void> => {
    try {
        await SnackModel.deleteMany(filter);
    } catch (err) {
        throw err;
    }
}

export const dbRemoveById = async (id: string): Promise<Document | null> => {
    try {
        validateId(id);

        return await SnackModel.findByIdAndDelete(id);
    } catch(err) {
        throw err;
    }
}