import UserRoutes from './user'
import TodoRoutes from './todo'
import express from 'express'

const routes = express.Router()

routes.use('/user', UserRoutes)
routes.use('/todo', TodoRoutes)

export default routes
