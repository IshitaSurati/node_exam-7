const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async () => {

    await mongoose.connect(process.env.DATABASE_URL)
    console.log("Connected to database");

}

module.exports = connectDB