import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  text: String,
  author: String,
}, { timestamps: true });

const taskModel = model('task', taskSchema);

export default taskModel;
