import { Sequelize } from 'sequelize-typescript'
import Todo from '../models/todo'
import User from '../models/user'
import 'dotenv/config'

const sequelizeConnection = new Sequelize({
  database: 'expressapp',
  username: 'root',
  password: '',
  dialect: 'mysql',
  port: 3306,
  host: 'localhost',
  models: [Todo, User]
})

export default sequelizeConnection
