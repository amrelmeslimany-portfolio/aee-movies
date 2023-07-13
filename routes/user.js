const router = require("express").Router();
const { isValidObjectId } = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const profileUploader = require("../middlewares/profileUploader");
const { notLoggedinGuard } = require("../middlewares/loggedGuard");
const { createPathURL } = require("../utils");

router.get("/:userid", async (req, res) => {
  const id = req.params.userid;

  if (!isValidObjectId(id))
    return res.status(400).json({ message: "لا يوجد يوزر" });

  try {
    const user = await User.findById(id);

    if (!user) throw { message: "لا يوجد يوزر" };

    res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      favourites: user.favourites.length,
      visited: user.visited.length,
      bio: user.bio,
      profileImg: user.profile,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/update", [notLoggedinGuard, profileUploader], async (req, res) => {
  const user = req.user;
  const { password, ...data } = req.body;
  const file = req.file;

  let hashed = null;

  try {
    if (password != "undefined" && password?.trim().length > 0) {
      const salt = await bcrypt.genSalt(10);
      hashed = await bcrypt.hash(password, salt);
    }
    const { bio, name, profile } = await User.findByIdAndUpdate(
      user._id,
      {
        bio: data.bio,
        name: data.name,
        profile: file ? createPathURL(file) : user.profile,
        password: hashed ? hashed : user.password,
      },
      { new: true }
    );

    res.status(200).json({ bio, name, profileImg: profile });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
