// utils/databese.js

const mongoose = require("mongoose")

const connectDB = async() => {
    try{
        await mongoose.connect("mongodb+srv://yarimasuka:tanomu@cluster0.2jwlpgw.mongodb.net/?retryWrites=true&w=majority")
        console.log("Success: Connected to MongoDB")
    }catch(err){
        console.log("Failure: Unconnected to MongoDB")
        throw new Error()
    }
}

module.exports = connectDB
