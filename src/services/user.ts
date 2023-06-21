import User, { createUser } from '../models/user'

export const signup = async (user: createUser): Promise<createUser> => {
  const result = await User.create(user)
  return result
}

// export const signin = (user: loginUser) => {

// }
