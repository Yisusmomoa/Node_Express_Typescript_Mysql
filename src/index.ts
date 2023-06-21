import express from 'express'
import sequelizeConnection from './db/sequelize'
import routes from './routes'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', routes)
sequelizeConnection.sync({ force: false }).then(() => {
  console.log('conection')
  app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
  })
}).catch((err) => {
  console.log('err: ', err)
})

// https://www.npmjs.com/package/sequelize-typescript

// TODO
/*
TODO
logica de users: registro y login
Logica de todos: create, get all by user, get by id, delete, update
jwt
*/
