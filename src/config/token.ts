import jwt from 'jsonwebtoken'
import { showUser } from '../models/user'

const SECRET = 'Todos'

// create token
export const generateToken = (payload: showUser): string => {
  const token = jwt.sign(
    payload,
    SECRET,
    { expiresIn: '30m' }
  )
  return token
}

// verificar el token

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET)
}
