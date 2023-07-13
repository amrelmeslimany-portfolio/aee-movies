const jwt = require("../helpers/jwt");
const User = require("../models/User");

const loggedinGuard = (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (token) return res.status(400).json({ message: "انت مسجل دخولك حاليا" });
  next();
};

const notLoggedinGuard = async (req, res, next) => {
  const token = req.cookies && req.cookies.token;
  if (!token)
    return res.status(401).json({ message: "انت لازم تسجل دخولك الاول" });

  try {
    const decoded = jwt.varifyToken(token);
    const user = await User.findById(decoded.id);
    if (!user) throw { message: "مش موجود اليوزر دا" };
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { loggedinGuard, notLoggedinGuard };
