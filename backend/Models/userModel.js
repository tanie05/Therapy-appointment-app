const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  countryCode: {
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
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    houseNo: {
      type: String
    },
    locality: {
      type: String
    },
    state: {
      type: String
    },
    city: {
      type: String
    },
    country: {
      type: String
    }
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'admin'
  }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
