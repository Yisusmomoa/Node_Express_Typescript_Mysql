import { Request } from 'express'
import { showUser } from './models/user'

export interface CustomRequest extends Request {
  user?: showUser
}
