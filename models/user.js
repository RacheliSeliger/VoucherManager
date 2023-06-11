const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  barcode: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
    


module.exports = mongoose.model('user', userSchema);
