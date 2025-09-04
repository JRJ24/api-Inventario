const { MongoClient } = require("mongodb");
const debug = require("debug")("app:database");

const {config} = require("../config/index");

var connection = null;

module.exports.Database = (collection) => 
    new Promise( async(res, rej) => {
    try{
        if(!connection){
            const client = new MongoClient(config.dbUri, {
                tls: true,
                tlsAllowInvalidCertificates: false,
                tlsAllowInvalidHostnames: false,
                serverSelectionTimeoutMS: 5000,
                connectTimeoutMS: 10000,
            });
            connection = await client.connect();
            debug("Database connected");
        }
        debug("Database already connected");
        const db = connection.db(config.mongoDbName);
        res(db.collection(collection));

    }catch(error){
        rej(error);
    }
})