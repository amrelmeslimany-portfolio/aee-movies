const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createToken, varifyToken } = require("../helpers/jwt");
const {
  loggedinGuard,
  notLoggedinGuard,
} = require("../middlewares/loggedGuard");

const maxAge = 60 * 60 * 24;

/* 
  will double cookies period , then check if jwt expired or not then refresh depends on jwt ex
*/
const cookieOptions = { httpOnly: true, maxAge: 1000 * maxAge };

// @ Create new user
router.post("/newuser", loggedinGuard, async (req, res) => {
  const { password, confirmPassword, ...body } = req.body;

  if (password != confirmPassword)
    return res.status(400).json({ message: "كلمات السر مختلفه عن بعضها!" });

  try {
    const foundEmail = await User.findOne({ email: body.email });

    if (foundEmail)
      throw { message: "موجود بريد الكتروني زى دا قبل كدا, جرب واحد تاني" };

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await User.create({ ...body, password: hashed });

    const token = createToken(user._id, maxAge);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        favourites: user.favourites,
        visited: user.visited,
        bio: user.bio,
        profileImg: user.profile,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// @ Login
router.post("/login", loggedinGuard, async (req, res) => {
  const body = req.body;

  try {
    const foundUser = await User.findOne({ email: body.email });

    if (!foundUser)
      throw { message: "مش موجود حساب بالبريد دا, تقدر تعمل حساب جديد" };

    const matchPassword = await bcrypt.compare(
      body.password,
      foundUser.password
    );

    if (!matchPassword) throw { message: "كلمة السر غلط" };
    const token = createToken(foundUser._id, maxAge);

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      user: {
        id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
        favourites: foundUser.favourites,
        visited: foundUser.visited,
        bio: foundUser.bio,
        profileImg: foundUser.profile,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
});

// @ Refresh login
router.get("/me", async (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    const decoded = varifyToken(token);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.clearCookie("token", cookieOptions).end();
    }

    return res.status(200).json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        favourites: user.favourites,
        visited: user.visited,
        bio: user.bio,
        profileImg: user.profile,
      },
    });
  }
  res.end();
});

// @ Logout
router.post("/logout", notLoggedinGuard, (req, res) => {
  res
    .clearCookie("token", cookieOptions)
    .status(200)
    .send("تم تسجيل الخروج بنجاح");
});

module.exports = router;
