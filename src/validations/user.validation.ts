import Joi from 'joi'
import UserType from '../type/user.type'

export const UserValidation = (payload: UserType) => {
  const schema = Joi.object({
    id: Joi.number().required(),
    fullname: Joi.string().allow(null, '').optional(),
    email: Joi.string().allow(null, '').optional(),
    username: Joi.string().allow(null, '').optional(),
    password: Joi.string().allow(null, '').optional(),
    created: Joi.string().allow(null, '').optional(),
    updated: Joi.string().allow(null, '').optional(),
    last_login: Joi.string().allow(null, '').optional()
  })

  return schema.validate(payload)
}
