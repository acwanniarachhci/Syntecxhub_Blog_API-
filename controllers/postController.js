const mongoose = require("mongoose");
const Post = require("../models/Post");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const handleError = (error, res) => {
  if (error.name === "ValidationError") {
    const messages = Object.values(error.errors).map((e) => e.message);
    return res.status(400).json({ success: false, message: messages });
  }
  if (error.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid data type provided" });
  }
  res.status(500).json({ success: false, message: "Server error" });
};

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// CREATE
exports.createPost = async (req, res) => {
  try {
    const { title, body, author, tags } = req.body;
    const post = await Post.create({ title, body, author, tags });
    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// READ ALL (pagination + filters + sorting)
exports.getPosts = async (req, res) => {
  try {
    const { tag, author, from, to, sort } = req.query;

    const filter = {};
    if (tag) filter.tags = String(tag).toLowerCase();
    if (author)
      filter.author = new RegExp(`^${escapeRegex(String(author))}$`, "i");

    if (from || to) {
      filter.createdAt = {};
      if (from) {
        const fromDate = new Date(from);
        if (isNaN(fromDate)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid 'from' date" });
        }
        filter.createdAt.$gte = fromDate;
      }
      if (to) {
        const toDate = new Date(to);
        if (isNaN(toDate)) {
          return res
            .status(400)
            .json({ success: false, message: "Invalid 'to' date" });
        }
        toDate.setHours(23, 59, 59, 999);
        filter.createdAt.$lte = toDate;
      }
    }

    const sortOrder = sort === "oldest" ? 1 : -1;

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
    const skip = Math.max(parseInt(req.query.skip) || 0, 0);

    const total = await Post.countDocuments(filter);
    const posts = await Post.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      limit,
      skip,
      hasMore: skip + posts.length < total,
      data: posts,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// READ ONE
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    handleError(error, res);
  }
};

// UPDATE
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }

    const { title, body, author, tags } = req.body;
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (body !== undefined) updates.body = body;
    if (author !== undefined) updates.author = author;
    if (tags !== undefined) updates.tags = tags;

    const post = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    handleError(error, res);
  }
};

// DELETE
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: "Invalid post ID" });
    }
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    handleError(error, res);
  }
};