require("dotenv").config();

module.exports.config = {
    port: process.env.PORT,
    dbUri: process.env.DB_URI
}