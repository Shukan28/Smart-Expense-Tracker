const mongoose = require("mongoose");

const connectDB = async () => {

    console.log("connectDB function called");

    try {

        console.log("Trying to connect...");

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB Connected");

    } catch (error) {

        console.error("❌ MongoDB Connection Failed");

        console.error(error);

    }
};

module.exports = connectDB;