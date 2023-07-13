const express = require("express");
const { isValidObjectId } = require("mongoose");
const router = express.Router();
const { notLoggedinGuard } = require("../middlewares/loggedGuard");
const Movie = require("../models/Movie");
const User = require("../models/User");

// @ GET favourites movies for user
router.get("/", notLoggedinGuard, async (req, res) => {
  const { listType } = req.query;

  if (listType !== "favourites" && listType !== "visitedBefore")
    return res.status(400).json({ message: "يجب تحديد نوع القائمة" });

  try {
    const items = await Movie.find({
      _id: {
        $in: listType === "favourites" ? req.user.favourites : req.user.visited,
      },
    });
    if (items.length == 0) throw { message: "ليس لديك افلام في القائمة" };
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// @ POST movie to favourite list
router.post("/add", notLoggedinGuard, async (req, res) => {
  const movieID = req.body.movieID;
  const userID = req.user._id;

  if (!isValidObjectId(movieID))
    return res.status(404).send("حاول مرة تانيه مع فيلم تاني");

  try {
    const movieFound = await Movie.findById(movieID);
    if (!movieFound) throw { message: "الفيلم الي بتضيفه دا مش موجود" };
    if (req.user.favourites.includes(movieID))
      throw { message: "الفيلم دا موجود في المفضلة بالفعل" };
    const result = await User.findByIdAndUpdate(userID, {
      $push: { favourites: movieID },
    });
    res.status(200).json(result.favourites);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// @ POST clear all favourites list
router.post("/remove_all", notLoggedinGuard, async (req, res) => {
  const { listType } = req.body;

  if (listType !== "favourites" && listType !== "visitedBefore")
    return res.status(400).json({ message: "يجب تحديد نوع القائمة" });

  try {
    let newSetList;

    if (listType === "favourites") newSetList = { favourites: [] };
    else if (listType === "visitedBefore") newSetList = { visited: [] };

    await User.findByIdAndUpdate(req.user._id, {
      $set: newSetList,
    });

    res.status(200).send("تم حذف القائمة بنجاح");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
// @ GET clear all favourites list
router.post("/remove_item", notLoggedinGuard, async (req, res) => {
  const { movieID, listType } = req.body;

  if (!movieID || !isValidObjectId(movieID))
    return res.status(404).json({ message: "مش موجود الفيلم دا عندنا" });

  if (listType !== "favourites" && listType !== "visitedBefore")
    return res.status(400).json({ message: "لازم تحدد نوع القائمه" });

  try {
    let pullKey;

    if (listType === "favourites") pullKey = { favourites: { $in: [movieID] } };
    else if (listType === "visitedBefore")
      pullKey = { visited: { $in: [movieID] } };

    await User.findByIdAndUpdate(req.user._id, {
      $pull: pullKey,
    });

    res.status(200).send(`تم حذف الفيلم بنجاح`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
