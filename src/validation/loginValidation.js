import Joi from "joi";
import validation from "./validation";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .pattern(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/
      )
    )
    .messages({
      "string.pattern.base": "password incorrect",
      "string.empty": "password must be filled to login",
    })
    .min(7)
    .max(20)
    .required(),
});

const validateLogin = (inputToCheck) => validation(loginSchema, inputToCheck);

export { validateLogin };
