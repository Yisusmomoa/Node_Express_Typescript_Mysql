import express from 'express'
import sequelizeConnection from './db/sequelize'
import routes from './routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())

app.use('/api', routes)

sequelizeConnection.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Connection and Server listening ${PORT}`)
  })
}).catch((err) => {
  console.log('err: ', err)
})

/*
TODO
logica de users: registro y login ✔
Logica de todos: create, get all by user, get by id, delete, update, marcar completada ✔
jwt y cookies ✔
correción del middleware authMe, añadir una propiedad al request en typescript ✔
correción en los métodos put, patch y delete permite eliminar todos que no son de otros usuarios ✔
Logout ✔
pruebas unitarias ✔
Redis https://codevoweb.com/node-typescript-mongodb-jwt-authentication/ para los token
*/
