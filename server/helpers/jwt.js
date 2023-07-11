const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (id, maxAge) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    return token;
  },
  varifyToken: (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  },
};
