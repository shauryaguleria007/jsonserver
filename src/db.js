const mongoose = require("mongoose")

exports.connectDataBase = async () => {
    const connection = await mongoose
        .set('strictQuery', false)
        .connect(process.env.mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("database connected");
        })
        .catch((error) => {
            throw new Error("database not connected.")
        })
}