const mongoose = require('mongoose');
const envConfig = require('./envConfig');


const startServer = async () => {
    const uri = envConfig.MONGOOSE_URL
    try {

        if (!uri) {
            throw new Error("Invalid URI")
        };


        await mongoose.connect(uri);

        console.log("Connection to Mongoose is Successfull!");

    } catch (error) {
        throw new Error("Error While Connecting the Database", error?.message);
        process.exit(1);
    }
}

module.exports = startServer;