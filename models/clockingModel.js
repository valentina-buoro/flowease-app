const mongoose = require("mongoose");

const clockingSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    project_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    clock_in: {
      type: Date,
      required: true,
    },
    break_start: {
        type: Date,
    },
    break_end: {
        type: Date,
    },
    clock_out: {
      type: Date,
    },
    productive_time: {
      type: Number, // store total productive time in milliseconds
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Clocking", clockingSchema);
