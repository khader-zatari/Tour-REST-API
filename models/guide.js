const mongoose = require("mongoose");
const id_validator = require("mongoose-id-validator");
const validator = require("validator");
var GuideSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    cellular: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
// TaskSchema.plugin(id_validator);
// TaskSchema.index("completed");

const guide = mongoose.model("guide", GuideSchema);

module.exports = guide;
