const Joi = require("joi");

const createComicSchema = Joi.object({
  name: Joi.string().required(),
  author: Joi.string().required(),
  year: Joi.number().integer().min(1000).max(9999).required(),
  price: Joi.number().required(),
  discount: Joi.number().optional(),
  numberOfPages: Joi.number().required(),
  condition: Joi.string().valid("new", "used", "pre-sale").required(),
  description: Joi.string().optional(),
});

const validateCreateComic = (req, res, next) => {
  const { error } = createComicSchema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

const updateComicSchema = Joi.object({
  name: Joi.string().disallow(null).optional(),
  author: Joi.string().disallow(null).optional(),
  year: Joi.number()
    .integer()
    .min(1000)
    .max(9999)
    .disallow(null)
    .optional(),
  price: Joi.number().disallow(null).optional(),
  discount: Joi.number().disallow(null).optional(),
  numberOfPages: Joi.number().disallow(null).optional(),
  condition: Joi.string()
    .valid("new", "used", "pre-sale")
    .disallow(null)
    .optional(),
  description: Joi.string().disallow(null).optional(),
}).or(
  "name",
  "author",
  "year",
  "price",
  "discount",
  "numberOfPages",
  "condition",
  "description"
);

const validateUpdateComic = (req, res, next) => {
  const { error } = updateComicSchema.validate(req.body, {
    allowUnknown: false,
  });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateCreateComic, validateUpdateComic };
