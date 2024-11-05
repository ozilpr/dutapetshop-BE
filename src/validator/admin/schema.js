const Joi = require('joi')

const AdminPayloadSchema = Joi.object({
  username: Joi.string()
    .pattern(/^[a-zA-Z0-9]+$/)
    .required()
    .max(50)
    .messages({
      'string.pattern.base': 'Username harus berupa huruf atau angka, dan tanpa spasi.',
      'any.required': 'Username tidak boleh kosong',
      'string.max': 'Username maksimal 50 karakter'
    }),
  password: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{8,}$/)
    .messages({
      'string.pattern.base': 'Password harus memiliki minimal 8 karakter, berupa huruf atau angka, dan tanpa spasi.',
      'any.required': 'Password tidak boleh kosong'
    }),
  confPassword: Joi.string()
    .required()
    .pattern(/^[a-zA-Z0-9]{8,}$/)
    .messages({
      'string.pattern.base':
        'Konfirmasi Password harus memiliki minimal 8 karakter, berupa huruf atau angka, dan tanpa spasi.',
      'any.required': 'Konfirmasi Password tidak boleh kosong'
    }),
  fullname: Joi.string().required().messages({
    'any.required': 'Nama lengkap tidak boleh kosong'
  })
})

const UpdateAdminPayloadSchema = Joi.object({
  username: Joi.string().allow(null, '').messages({
    'string.empty': 'Username tidak boleh kosong'
  }),
  password: Joi.string()
    .allow(null, '')
    .pattern(/^[a-zA-Z0-9]{8,}$/)
    .messages({
      'string.pattern.base': 'Password harus memiliki minimal 8 karakter, berupa huruf atau angka, dan tanpa spasi.'
    }),
  confPassword: Joi.string()
    .allow(null, '')
    .pattern(/^[a-zA-Z0-9]{8,}$/)
    .messages({
      'string.pattern.base':
        'Konfirmasi Password harus memiliki minimal 8 karakter, berupa huruf atau angka, dan tanpa spasi.'
    }),
  fullname: Joi.string().allow(null, '').messages({
    'string.empty': 'Nama lengkap tidak boleh kosong'
  })
})

module.exports = { AdminPayloadSchema, UpdateAdminPayloadSchema }
