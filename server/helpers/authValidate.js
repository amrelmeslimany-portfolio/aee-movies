const JOI = require("joi");

module.exports = {
  validateHandler: (schema) => {
    return (res, req, next) => {
      const result = JOI.validate(req.body, schema);
      if (result.error) return res.status(400).json(result.error);
      if (!req.value) {
        req.value = {};
      }
      req.value["body"] = result.value;
      next();
    };
  },
  schemas: {
    signup: JOI.object().keys({
      name: JOI.string().min(2).required(),
      email: JOI.string().email().required(),
      password: JOI.string().min(6),
    }),
  },
};
