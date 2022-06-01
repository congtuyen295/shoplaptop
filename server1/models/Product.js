const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nhập tên"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Nhập mota"],
    },
    operatingSystem: {
      type: String,
      required: [true, "Please he dieu hanh"],
    },
    quantity: {
      type: Number,
      required: [true, "Please so luong"],
    },
    price: {
      type: Number,
      required: [true, "Please giá"],
    },
    price_spe: {
      type: Number,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    cpu: {
      type: String,
      required: [true, "Nhập model"],
    },
    vga: {
      type: String,
      required: [true, "Nhập CPU"],
    },
    ram: {
      type: String,
      required: [true, "Nhập cardVGA"],
    },
    hardDrive: {
      type: String,
      required: [true, "Nhập ổ cứng"],
    },
    screen: {
      type: String,
      required: [true, "Nhập bàn phím"],
    },
    size: {
      type: String,
      required: [true, "Nhập bàn phím"],
    },
    color: {
      type: String,
      required: [true, "Nhập màn hình"],
    },

    webcam: {
      type: String,
      required: [true, "Nhập webcam"],
    },
    weight: {
      type: Number,
      required: [true, "Nhập audio"],
    },
    pin: {
      type: Number,
      required: [true, "Nhập pin"],
    },
    discount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    category: {
      type: String,
      required: [true, "Nhập category"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
