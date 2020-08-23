const Joi = require("@hapi/joi");

const registerSchemaValidate = Joi.object({
  username: Joi.string().trim().alphanum().min(2).max(64).required(),

  password: Joi.string().required(),

  repeat_password: Joi.ref("password"),

  email: Joi.string()
    .trim()
    .lowercase()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "info", "io", "gov", "us"] },
    }),
}).with("password", "repeat_password");

module.exports = registerSchemaValidate;
