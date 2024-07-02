require('dotenv').config();

module.exports = {
    MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
};
