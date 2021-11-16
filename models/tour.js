const mongoose = require("mongoose");
const id_validator = require("mongoose-id-validator");

var TourSchema = new mongoose.Schema(
  {
    countryName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    start_date: {
      type: Date,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    guide: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "guide",
      required: true,
    },
    path: [
      {
        country: { type: String, trim: true },
        name: { type: String, trim: true },
      },
    ],
  },
  { timestamps: true }
);
TourSchema.plugin(id_validator);
// TaskSchema.index("completed");

const tour = mongoose.model("tour", TourSchema);

module.exports = tour;
