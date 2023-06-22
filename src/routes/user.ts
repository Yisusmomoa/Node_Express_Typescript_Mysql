import express from 'express'
import { signin, signup } from '../services/user'
import { createUser, loginUser } from '../models/user'

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
router.post('/signin', async (req, res) => {
  try {
    const user: loginUser = req.body
    if ((user.email === null || user.pass === null) ||
        (user.email === undefined || user.pass === undefined)) {
      throw new Error('Error, faltan campos')
    }
    const result = await signin(user)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

export default router
