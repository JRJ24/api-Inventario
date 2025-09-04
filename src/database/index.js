const mongoose = require("mongoose");
const debug = require("debug")("app:database");

const {config} = require("../config/index");

var connection = null;

module.exports.Database = (collection) => 
    new Promise( async(res, rej) => {
    try{
        if(!connection){
            await mongoose.connect(config.dbUri);
            connection = mongoose.connection;
            debug("Database connected");
        }
        
        // Wait for connection to be ready
        if (connection.readyState !== 1) {
            await new Promise((resolve) => {
                connection.once('open', resolve);
            });
        }
        
        const db = connection.db;
        res(db.collection(collection));

    }catch(error){
        rej(error);
    }
})