const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  text:  String,
  author: String,
}, { timestamps: true });

const taskModel = model('task', taskSchema);

module.exports = taskModel;
