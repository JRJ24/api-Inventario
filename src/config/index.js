require("dotenv").config();

module.exports.config = {
    port: process.env.PORT,
    dbUri: process.env.DB_URI,
    mongoDbName: process.env.MONGO_DB_NAME
}