const {ObjectId} = require("mongodb");
const {Database} = require("../database/index");
const {ProductsUtils} = require("../products/utils");

const COLLECTION = "products";

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find().toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({_id: new ObjectId(id)});
}   

const Create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const updateProduct = async (id, product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.updateOne({_id: new ObjectId(id)}, {$set: product});
    return result.modifiedCount;
}

const deleteProduct = async (id) => {
    const collection = await Database(COLLECTION);
    let result = await collection.deleteOne({_id: new ObjectId(id)});
    return result.deletedCount;
}


const reportGenerate = async (name, res) => {
    let product = await getAll();
    ProductsUtils.excelGenerate(product, name, res);
}


module.exports.productsServices = {
    getAll,
    getById,
    Create,
    updateProduct,
    deleteProduct,
    reportGenerate
}