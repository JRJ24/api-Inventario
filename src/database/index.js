const mongoose = require("mongoose");
const debug = require("debug")("app:database");

const {config} = require("../config/index");

var connection = null;

module.exports.Database = (collection) => 
    new Promise( async(res, rej) => {
    try{
        if(!connection){
            connection = await mongoose.connect(config.dbUri);
            debug("Database connected");
        }
        const db = mongoose.connection.db;
        res(db.collection(collection));

    }catch(error){
        rej(error);
    }
})