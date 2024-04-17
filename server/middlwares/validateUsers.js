import Joi from 'joi';

const validateUserSchema = Joi.object({
  username: Joi.string().alphanum().max(10),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).max(12).required(),
});

const validateUserCreation = (data) => {
  return validateUserSchema.validate(data, { abortEarly: false });
};
export default validateUserCreation;