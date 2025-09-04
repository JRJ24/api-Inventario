const mongoose = require("mongoose");
const debug = require("debug")("app:database");

const {config} = require("../config/index");

var connection = null;

module.exports.Database = (collection) => 
    new Promise( async(res, rej) => {
    try{
        mongoose.connect(process.env.DB_URI);
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => {
            debug("Database connected");
        });
        res(db.collection(collection));

    }catch(error){
        rej(error);
    }
})