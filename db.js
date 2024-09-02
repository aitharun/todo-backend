require('dotenv').config();
const mongoose = require("mongoose");
const mongo_key = process.env.mongo_key;
mongoose.connect(mongo_key)

const todosSchema = new mongoose.Schema({
    title: String,
    completed: Boolean
})

const todo = mongoose.model('todo',todosSchema);
module.exports = {
    todo
}