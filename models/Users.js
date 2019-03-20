const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
 });

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;