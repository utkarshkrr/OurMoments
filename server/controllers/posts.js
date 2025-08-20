import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import { cloudinary } from "../utils/cloudinary.js";
import router from "../routes/posts.js";

// GET: paginated posts
export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 9;
    const startIndex = (Number(page) - 1) * LIMIT; // get starting index of every page

    const total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ date: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET: single post
export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// GET: search posts
export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i"); // i = ignore case

    const posts = await PostMessage.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// POST: create a new post
export const createPost = async (req, res) => {
  try {
    const post = req.body;

    let imageUrl = "";
    if (post.selectedFile) {
      // Upload to Cloudinary
      const uploadedResponse = await cloudinary.uploader.upload(post.selectedFile, {
        folder: "memories_app",
      });
      imageUrl = uploadedResponse.secure_url;
    }

    const newPost = new PostMessage({
      ...post,
      selectedFile: imageUrl, // store URL
      creator: req.userId,
      createdAt: new Date().toISOString(),
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// PATCH: update post
export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  let imageUrl = post.selectedFile;
  if (post.selectedFile && post.selectedFile.startsWith("data")) {
    // Only upload if it's a new base64 image
    const uploadedResponse = await cloudinary.uploader.upload(post.selectedFile, {
      folder: "memories_app",
    });
    imageUrl = uploadedResponse.secure_url;
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, selectedFile: imageUrl },
    { new: true }
  );

  res.json(updatedPost);
};

// DELETE: delete post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  console.log("Delete request received for id:", id);

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("Invalid ObjectId");
      return res.status(404).json({ message: "Invalid post id" });
    }

    const post = await PostMessage.findById(id);
    if (!post) {
      console.log("Post not found in DB");
      return res.status(404).json({ message: "Post not found" });
    }

    console.log("Post found:", post);

    // Try Cloudinary delete
    if (post.selectedFile) {
      console.log("Trying Cloudinary delete for:", post.selectedFile);
      try {
        const parts = post.selectedFile.split("/");
        const filename = parts[parts.length - 1]; // e.g. abc123.jpg
        const publicId = "memories_app/" + filename.split(".")[0];

        await cloudinary.uploader.destroy(publicId);
        console.log("Cloudinary deleted:", publicId);
      } catch (err) {
        console.error("Cloudinary delete error:", err.message);
      }
    }

    await PostMessage.findByIdAndDelete(id);
    console.log("Post deleted from MongoDB");

    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DeletePost Error:", error);
    return res.status(500).json({ message: "Server error while deleting post" });
  }
};


// PATCH: like post
export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    post.likes.push(req.userId);
  } else {
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};


export const commentPost = async (req,res) => {
  const { id } = req.params;
  const { value } = req.body;

  const post = await PostMessage.findById(id);

  post.comments.push(value);

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
  res.json(updatedPost);
}

