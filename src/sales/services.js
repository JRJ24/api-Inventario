const {ObjectId} = require("mongodb");
const {Database} = require("../database/index");

const COLLECTION = "sales";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find().toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: new ObjectId(id)});
}   

const Create = async (sale) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(sale);
    return result.insertedId;
}

const updateSale = async (id, sale) => {
    const collection = await Database(COLLECTION);
    let result = await collection.updateOne({_id: new ObjectId(id)}, {$set: sale});
    return result.modifiedCount;
}

const deleteSale = async (id) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({_id: new ObjectId(id)});
    return result.deletedCount;
}


module.exports.salesServices = {
    getAll,
    getById,
    Create,
    updateSale,
    deleteSale
}