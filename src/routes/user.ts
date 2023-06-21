import express from 'express'
import { signup } from '../services/user'

const router = express.Router()

router.post('/signup', async (req, res) => {
  try {
    const newUser = req.body
    const result = await signup(newUser)
    if (!result) throw new Error('Error al crear el usuario, intentar más tarde')
    console.log('🚀 ~ file: user.ts:11 ~ router.post ~ result:', result)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

router.get('/signin', (_req, res) => {
  res.send('get usersd')
})

export default router
