// validators/auth.validator.js
const Joi = require('joi');

const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required'
    }),

  fullname: Joi.object({
    firstname: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.min': 'First Name must be at least 3 characters long',
        'any.required': 'First Name is required'
      }),

    lastname: Joi.string()
      .min(1)
      .required()
      .messages({
        'any.required': 'Last Name is required'
      })
  }).required().messages({
    'any.required': 'Fullname object is required'
  }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.min': 'Password must be at least 6 characters long',
      'any.required': 'Password is required'
    })
});


const loginSchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required'
        }),
    
    password: Joi.string()
        .min(6)
        .required()
        .messages({
        'string.min': 'Password must be at least 6 characters long',
        'any.required': 'Password is required'
        })
})


module.exports = {
  registerSchema,
  loginSchema
};
