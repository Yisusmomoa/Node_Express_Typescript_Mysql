import User, { createUser, loginUser, showUser } from '../models/user'

export const signup = async (user: createUser): Promise<createUser> => {
  const result = await User.create(user)
  return result
}

export const signin = async (user: loginUser): Promise<showUser | null> => {
  const result = await User.findOne({
    where: {
      email: user.email
    },
    attributes: ['id', 'username', 'email', 'pass', 'salt']
  })
  if (result == null) throw new Error('No se encontro el usuario')
  const isEqual = await result.validatePassword(user.pass)
  if (!isEqual) throw new Error('Error en la contraseña o usuario')
  if (result === null) throw new Error('Error, email o contraseña no encontrados')
  return result
}
