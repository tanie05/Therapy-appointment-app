const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TherapySchema = new Schema({
  healthPlan: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timings: {
    type: [Date],
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['booked', 'pending', 'cancelled'],
    default: 'pending',
    required: true
  }
}, { timestamps: true });

const Therapy = mongoose.model("Therapy", TherapySchema);

module.exports = Therapy;

