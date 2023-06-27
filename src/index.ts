import express from 'express'
import sequelizeConnection from './db/sequelize'
import routes from './routes'
import cookieParser from 'cookie-parser'
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api', routes)
sequelizeConnection.sync({ force: false }).then(() => {
  console.log('conection')
  app.listen(PORT, () => {
    console.log(`Server listening ${PORT}`)
  })
}).catch((err) => {
  console.log('err: ', err)
})

/*
TODO
logica de users: registro y login ✔
Logica de todos: create, get all by user, get by id, delete, update, marcar completada ✔
jwt y cookies ✔
correción del middleware authMe, añadir una propiedad al request en typescript
pruebas unitarias
Redis https://codevoweb.com/node-typescript-mongodb-jwt-authentication/ para los token
*/
