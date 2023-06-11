//defines the Task model using Mongoose, representing the structure of a task in the MongoDB collection.

const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: 'user',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  });
  

module.exports = mongoose.model('task', taskSchema);
