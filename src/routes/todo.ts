import express, { Request, Response } from 'express'
import { createTodo } from '../models/todo'
import { newTodo, showTodoById, showTodosByUser } from '../services/todo'
import authMe from '../middlewares/authMe'

const router = express.Router()

router.use(authMe)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/', async (req: any, res) => {
  try {
    const id = req.user.id
    const todos = await showTodosByUser(id)
    if ((todos == null) || todos.length < 0) throw new Error('No cuenta con todos')
    res.status(200).send(todos)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.get('/:id', async (req: any, res: any) => {
  try {
    const id = Number(req.params.id)
    const idUser = req.user.id
    const todo = await showTodoById(id, idUser)
    res.status(200).send(todo)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/', async (req: any, res: Response) => {
  try {
    const todo: createTodo = {
      title: req.body.title,
      description: req.body.description,
      userCreate: req.user.id
    }

    const result = await newTodo(todo)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!result) throw new Error('Error al crear la todo, intentar más tarde')
    res.status(201).send(result)
  } catch (error) {
    res.status(400).send({ message: error.message })
  }
})

router.put('/id', (_req: Request, res: Response) => {
  res.send('update todo')
})

router.delete('/id', (_req: Request, res: Response) => {
  res.send('delete todo')
})

export default router
