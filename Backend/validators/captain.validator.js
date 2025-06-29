const Joi = require('joi');


const registerSchema = Joi.object({
  email: Joi.string()
    .email()
    .min(5)
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'any.required': 'Email is required',
      'string.min': 'Email must be at least 5 characters'
    }),

  fullname: Joi.object({
    firstname: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.min': 'First name must be at least 3 characters',
        'any.required': 'First name is required'
      }),
    lastname: Joi.string()
      .min(3)
      .allow('', null)
      .messages({
        'string.min': 'Last name must be at least 3 characters'
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
    }),



  vehicle: Joi.object({
    color: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.min': 'Color must be at least 3 characters',
        'any.required': 'Color is required'
      }),
    plate: Joi.string()
      .min(3)
      .required()
      .messages({
        'string.min': 'Plate must be at least 3 characters',
        'any.required': 'Plate is required'
      }),
    capacity: Joi.number()
      .min(1)
      .required()
      .messages({
        'number.min': 'Capacity must be at least 1',
        'any.required': 'Capacity is required'
      }),
    vechicleType: Joi.string()
      .valid('car', 'motorcycle', 'auto')
      .required()
      .messages({
        'any.only': 'Vehicle type must be car, motorcycle, or auto',
        'any.required': 'Vehicle type is required'
      })
  }).required().messages({
    'any.required': 'Vehicle object is required'
  }),


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
});

module.exports = {
  registerSchema,
  loginSchema
};
