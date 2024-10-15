const mongoose = require("mongoose");

const comicSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    yearOfPublication: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "used", "pre-sale"],
      required: true,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

const Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
