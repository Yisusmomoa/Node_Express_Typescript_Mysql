import express, { Request, Response } from 'express'
import { signin, signup } from '../services/user'
import { createUser, loginUser } from '../models/user'
import authMe from '../middlewares/authMe'

const router = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/signup', async (req, res) => {
  try {
    const newUser: createUser = req.body
    if ((newUser.email === null || newUser.email === undefined) ||
      (newUser.pass === null || newUser.pass === undefined) ||
      (newUser.username === null || newUser.username === undefined)) {
      throw new Error('Error, faltan campos')
    }
    const result = await signup(newUser)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!result) throw new Error('Error al crear el usuario, intentar más tarde')
    res.status(201).send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/signin', async (req: Request, res: Response) => {
  try {
    const user: loginUser = req.body
    if ((user.email === null || user.pass === null) ||
        (user.email === undefined || user.pass === undefined)) {
      throw new Error('Error, faltan campos')
    }
    const token = await signin(user)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.cookie('token', token)
    res.status(200).send({ message: 'Usuario logeado', token })
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.get('/usuariologeado', authMe, (req, res) => {
  const user = req.body.user
  res.status(202).send(user)
})

export default router
