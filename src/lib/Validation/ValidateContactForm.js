import Joi from "joi";

export const validateContactForm = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(2)
      .max(50)
      .trim()
      .required()
      .messages({
        "string.empty": "Name is required.",
        "string.min": "Name must be at least 2 characters long.",
        "string.max": "Name must be at most 50 characters long.",
      }),

    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.empty": "Email is required.",
        "string.email": "Enter a valid email address.",
      }),

    subject: Joi.string()
      .min(3)
      .max(100)
      .trim()
      .required()
      .messages({
        "string.empty": "Subject is required.",
        "string.min": "Subject must be at least 3 characters long.",
        "string.max": "Subject must be at most 100 characters long.",
      }),

    message: Joi.string()
      .min(10)
      .max(512)
      .trim()
      .required()
      .messages({
        "string.empty": "Message is required.",
        "string.min": "Message must be at least 10 characters long.",
        "string.max": "Message must be at most 512 characters long.",
      }),
  });

  return schema.validate(data, { abortEarly: false });
};
