const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TherapySchema = new Schema(
  {
    healthPlan: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      enum: ["english", "spanish"],
      default: "english",
      required: true,
    },
    timings: {
      type: [Date],
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      houseNo: {
        type: String,
        required: true,
      },
      locality: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    phone: {
      countryCode: {
        type: String,
        required: true,
      },
      number: {
        type: String,
        required: true,
      },
    },
    DOB: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: ["booked", "pending", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

const Therapy = mongoose.model("Therapy", TherapySchema);

module.exports = Therapy;
