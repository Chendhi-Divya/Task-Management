const mongoose = require("mongoose");

const pageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      default: "Untitled",
    },

    icon: {
      type: String,
      default: "📄",
    },

    coverImage: {
      type: String,
      default: "",
    },

    content: {
      type: String,
      default: "",
    },

    parentPage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Page",
      default: null,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Page", pageSchema);