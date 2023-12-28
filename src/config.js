const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb+srv://huy1:QgDrC0d8BCSozPkh@huy.erko6mx.mongodb.net/?authSource=+Huy&authMechanism=SCRAM-SHA-1");

connect.then(() => {
    console.log("Database connected");
})
.catch(() =>{
    console.log("Database can't be connect");
})

const LoginSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    }
});

const collection = new mongoose.model("users", LoginSchema);

module.exports = collection;