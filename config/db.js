const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // options removed - they are now default in Mongoose 6+
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;