const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String
    }
  },
  password: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['english', 'spanish'],
    default: 'english',
    required: true
  },
  DOB: {
    type: Date,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;