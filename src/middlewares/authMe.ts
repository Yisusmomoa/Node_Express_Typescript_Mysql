import { NextFunction, Response } from 'express'
import { verifyToken } from '../config/token'
import { CustomRequest } from '../CustomRequest '

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const authMe = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    const token = req.cookies.token
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!token) throw new Error('token invalido')
    const data = verifyToken(token)
    req.user = data
    return next()
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: error.message
    })
  }
}
export default authMe
