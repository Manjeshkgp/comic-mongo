const Joi = require("joi");
const mongoose = require("mongoose");

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

const comicsQuerySchema = Joi.object({
  author: Joi.string().min(1).optional().allow("").messages({
    "string.base": "Author must be a string.",
    "string.min": "Author must have at least 1 character.",
  }),
  name: Joi.string().min(1).optional().allow("").messages({
    "string.base": "Name must be a string.",
    "string.min": "Name must have at least 1 character.",
  }),
  year: Joi.number()
    .integer()
    .min(1800)
    .max(new Date().getFullYear())
    .optional()
    .allow("")
    .messages({
      "number.base": "Year must be a number.",
      "number.min": "Year must be at least 1800.",
      "number.max": `Year cannot exceed ${new Date().getFullYear()}.`,
    }),
  price: Joi.number().min(0).optional().allow("").messages({
    "number.base": "Price must be a number.",
    "number.min": "Price must be a non-negative number.",
  }),
  condition: Joi.string()
    .valid("new", "used", "pre-sale")
    .optional()
    .allow("")
    .messages({
      "any.only": "Condition must be one of [new, used, pre-sale].",
    }),
  sortBy: Joi.string()
    .valid("name", "price", "year")
    .optional()
    .allow("")
    .default("name")
    .messages({
      "any.only": "SortBy must be one of [name, price, year].",
    }),
  order: Joi.string()
    .valid("asc", "desc")
    .optional()
    .allow("")
    .default("asc")
    .messages({
      "any.only": "Order must be either 'asc' or 'desc'.",
    }),
  page: Joi.number().integer().min(1).optional().allow("").default(1).messages({
    "number.base": "Page must be a number.",
    "number.min": "Page must be at least 1.",
  }),
  limit: Joi.number()
    .integer()
    .min(1)
    .optional()
    .allow("")
    .default(12)
    .messages({
      "number.base": "Limit must be a number.",
      "number.min": "Limit must be at least 1.",
    }),
});

const validateComicsQuery = (req, res, next) => {
  const { error } = comicsQuerySchema.validate(req.query, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateObjectId, validateComicsQuery };
