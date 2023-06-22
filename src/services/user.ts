import { Op } from 'sequelize'
import User, { createUser, loginUser, showUser } from '../models/user'

export const signup = async (user: createUser): Promise<createUser> => {
  const result = await User.create(user)
  return result
}

export const signin = async (user: loginUser): Promise<showUser | null> => {
  const result = await User.findOne({
    where: {
      [Op.and]: [
        { email: user.email },
        { pass: user.pass }
      ]
    },
    attributes: ['id', 'username', 'email']
  })
  if (result === null) throw new Error('Error, email o contraseña no encontrados')
  return result
}
