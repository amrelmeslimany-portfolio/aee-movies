const express = require("express");
const fs = require("fs");
const { isValidObjectId } = require("mongoose");
const { notLoggedinGuard } = require("../middlewares/loggedGuard");
const communityUploader = require("../middlewares/communityUploader");
const Post = require("../models/Post");
const router = express.Router();

const postSchema = (item) => {
  let list = {
    postID: item._id,
    postCover: item.cover,
    postBody: item.body,
    postLikes: item.likes.ids,
    postCreatedAt: item.createdAt,
  };
  if (item.author) {
    list = {
      ...list,
      postUserID: item.author._id,
      postProfile: item.author.profile,
      postUsername: item.author.name,
    };
  } else {
    list = {
      ...list,
      postUserID: null,
      postProfile: "uploads/images/profiles/deleted.jpg",
      postUsername: "مستخدم محذوف",
    };
  }

  return list;
};

router.get("/", async (req, res) => {
  const { userID: postUserID, page, sorting } = req.query;
  const limit = 5;
  const skip = (page - 1) * limit;
  const filters = sorting ? sorting.split(",") : [];

  if (postUserID && !isValidObjectId(postUserID))
    return res.status(400).json({ message: "مفيش أخبار لليوزر دا." });

  try {
    let sentData = {
      isMore: false,
      items: [],
    };

    const filterFind = postUserID ? { author: postUserID } : {};
    const oldest = filters.includes("oldest") ? 1 : -1;
    const likest = filters.includes("likest") ? -1 : 1;
    const posts = await Post.find(filterFind)
      .sort({ "likes.size": likest, createdAt: oldest, _id: -1 })
      .skip(skip)
      .limit(limit)
      .populate("author");

    if (posts.length == 0) return res.status(200).json(sentData);
    if (posts.length < limit) sentData = { ...sentData, isMore: false };
    else sentData = { ...sentData, isMore: true };

    const handled = posts.map(postSchema);

    sentData = { ...sentData, items: handled };

    res.status(200).json(sentData);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/add", [notLoggedinGuard, communityUploader], async (req, res) => {
  const { postBody } = req.body;
  const trimBody = postBody?.trim();
  const file = req.file;
  if (!postBody && !file)
    return res.status(400).json({ message: "لازم ترفع صورة او تكتب محتوي" });

  try {
    const post = {
      author: req.user._id,
      body: trimBody || null,
      cover: file ? `${file.destination}/${file.filename}`.slice(2) : null,
      likes: { ids: [] },
    };
    const createdPost = await Post.create(post);
    const populatedPost = await createdPost.populate("author");

    res.status(200).json(postSchema(populatedPost));
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/like/:postID", notLoggedinGuard, async (req, res) => {
  const postID = req.params.postID;
  const userID = req.user._id;
  if (!postID || !isValidObjectId(postID))
    return res.status(400).json({ message: "لايوجد خبر بهذا الid" });

  try {
    const post = await Post.findById(postID);
    if (post.likes.ids.get(userID)) post.likes.ids.delete(userID);
    else post.likes.ids.set(userID, true);
    const updatedPost = await Post.findByIdAndUpdate(
      postID,
      {
        likes: {
          size: post.likes.ids.size,
          ids: post.likes.ids,
        },
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      likes: updatedPost.likes.ids,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/delete/:postID", notLoggedinGuard, async (req, res) => {
  const postID = req.params.postID;
  const userID = req.user._id;

  if (!isValidObjectId(postID))
    return res.status(400).json({ message: "لايوجد خبر لحذفه..." });
  try {
    const isAllowed = await Post.findById(postID);

    if (!isAllowed || String(isAllowed.author) != String(userID))
      throw {
        message:
          "لايمكنك حذف هذا الخبر لربما ليس مسموح لك بذلك, او هذا الخبر غير موجود.",
      };

    const deletedItem = await Post.findByIdAndDelete(postID);

    // Remove cover if exist
    if (deletedItem.cover && fs.existsSync(deletedItem.cover)) {
      fs.unlinkSync(deletedItem.cover);
    }

    res.status(200).json({ success: "تم الحذف بنجاح" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
