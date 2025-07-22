const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema(
  {
     blog_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
       author: {
       type: String,
      required: true,

    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    readTime: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
    },
    content: {
      type: String,
      required: true,
    },
    slug_url: {
      type: String,
    },
    image: {
      type: String,
      default: `https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80`,
      trim: true,
    },
    thumbnailImage: {
      type: String,
      default: `https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80`,
      trim: true,
    },
    thumbnailAlt: {
      type: String,
    },
    coverAlt: {
      type: String,
    },
    metaImage: {
      type: String,
    },
    published: {
      type: Boolean,
      default: false,
    },
    blogReadCount: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    metaTag: {
      type: Object, // Equivalent to JSONB
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Blogs", BlogsSchema);
