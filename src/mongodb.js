//establish database connection
const mongoose = require("mongoose");
//copy the connection string to MongoDB Compass followed by name of database e.g. ("x/{name of database}")
const connect =  mongoose.connect("mongodb+srv://nathansem123:6Rr2eQ58JIBh6nP6@nathanworkspace.82yhv2k.mongodb.net/NudgeBuddyV1");

//check if database is connected or not
connect.then(() => {
    console.log("Database connected successfully!")
})
.catch(() => {
    console.log("Database has not connected successfully")
})


//create documents -> create a Schema
const LoginSchema = new mongoose.Schema({
//define what your data will look like -> in this case its name and password

    username: {
        type: String,
        required: true
    },


    firstname: {
        type: String,
        required: true
    },


    password: {
        type: String,
        required: true
    },

    age:{
        type: Number,
        required: true
    },

    breakfastTime:{
        type: String,
        required: true
    },

    lunchTime:{
        type: String,
        required: true
    },

    dinnerTime:{
        type: String,
        required: true
    },

})


//define collection model
const collection = new mongoose.model("users", LoginSchema); //where we'll be exporting the data to 

//need this line so it can be included in the index.js
module.exports = collection;