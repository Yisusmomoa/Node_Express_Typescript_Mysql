import { Sequelize } from 'sequelize-typescript'
import Todo from '../models/todo'
import User from '../models/user'

const sequelizeConnection = new Sequelize({
  database: 'expressapp',
  username: 'root',
  password: '',
  dialect: 'mysql',
  port: 3306,
  host: 'localhost',
  models: [Todo, User]
})

// sequelizeConnection.authenticate().then(() => {
//   console.log('Connection has been established successfully.')
// }).catch((err) => {
//   console.log('err sequelize: ', err)
// })

// try {
//   await sequelizeConnection.authenticate()
//   console.log('Connection has been established successfully.')
// } catch (error) {
//   console.error('Unable to connect to the database:', error)
// }

export default sequelizeConnection
