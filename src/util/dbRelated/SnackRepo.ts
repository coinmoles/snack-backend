import { Document, FilterQuery, Query, Types } from "mongoose";
import { SnackModel } from "./SnackModel";
import { SnackData } from "../interface/SnackData";

const validateId = (id: string): boolean => {
    if (!Types.ObjectId.isValid(id)) {
        throw new Error('id invalid');
    }

    return true;
}

const create = async (data: SnackData | SnackData[]): Promise<Document> => {
    try {
        
        const snackData = new SnackModel(data);
        return snackData.save();
    } catch (err) {
        throw err;
    }
}

const read = async (filter?: FilterQuery<SnackData>): Promise<SnackData[]> => {
    try {
        if (filter === undefined) 
            return SnackModel.find();
        else
            return SnackModel.find(filter);
    } catch (err) {
        throw err;
    }
}

const readById = async (id: string): Promise<Document | null> => {
    try {
        validateId(id);

        return SnackModel.findById(id);
    } catch (err) {
        throw err;
    }
}

const update = async (filter: FilterQuery<SnackData>, data: SnackData): Promise<SnackData | null> => {
    try {
        return SnackModel.findOneAndUpdate(filter, { $set: data })
    } catch (err) {
        throw err;
    }
}

const updateById = async (id : string, data: SnackData): Promise<Document | null> => {
    try {
        validateId(id);

        return await SnackModel.findByIdAndUpdate(id, { $set: data });
    } catch (err) {
        throw err;
    }
}

const remove = async (filter?: FilterQuery<SnackData>): Promise<void> => {
    try {
        await SnackModel.deleteMany(filter);
    } catch (err) {
        throw err;
    }
}

const removeById = async (id: string): Promise<Document | null> => {
    try {
        validateId(id);

        return await SnackModel.findByIdAndDelete(id);
    } catch(err) {
        throw err;
    }
}

export default {
    create,
    read,
    readById,
    update,
    updateById,
    remove,
    removeById
};