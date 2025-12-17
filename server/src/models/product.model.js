const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    brandName: {
      type: String,
      required: true,
      trim: true,
    },

    images: {
      type: String,
      required: true,
    },

    originalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    currentPrice: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.originalPrice;
        },
        message: "Current price cannot be greater than original price",
      },
    },
    category: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "Headphones",
        "EarBuds",
        "Watch",
        "Speaker",
        "Desk-Organisers",
        "Poster",
        "Wallet",
      ],
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
