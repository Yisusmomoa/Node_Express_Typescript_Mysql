
# Todo app

Api Rest para manejar tareas diarias, pudiendo registrarse, iniciar sesión, crear tareas, editar su información, su estatus y eliminarlas.
La idea final es realizar un clon sencillo de la aplicación trello.
## API Reference

### Users

#### Signup
```http
  POST /api/user/signup
```
#### Signin
```http
  POST /api/user/signin
```
#### Logout
```http
  POST /api/user/logout
```
#### me
```http
  GET /api/user/me
```
### Todos

#### Create todo
```http
  POST /api/todo/
```
#### get all todos by user
```http
  GET /api/todo/
```
#### get todos by id
```http
  GET /api/todo/${id}
```
#### delete todo
```http
  DELETE /api/todo/${id}
```
#### update todo
```http
  PUT /api/todo/${id}
```
#### update status todo
```http
  PATCH /api/todo/${id}
```

## Tech Info

**Server:** Node, Express, Typescript, JWT, Mysql, Sequelize, bcrypt, Jest, supertest


## Run Locally

Clone the project

```bash
  git clone https://github.com/Yisusmomoa/Node_Express_Typescript_Mysql.git
```

Go to the project directory

```bash
  cd Node_Express_Typescript_Mysql
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```


## Pruebas unitarias

![App Screenshot](https://firebasestorage.googleapis.com/v0/b/testloginwwq.appspot.com/o/TestsPasados.PNG?alt=media&token=8b73ee55-ddc3-4192-819e-c4e2f14a373f)


## Lessons Learned
Este proyecto me fue de mucha ayuda para poder poner en practica lo que estuve aprendiendo de typescript las ultimas semanas, realizando interfaces y types para poder apegarme a POO e ir entendiendo poco a poco los patrones de diseño y realizando pruebas unitarias.
Este proyecto fue realizado usando express, JWT, el ORM Sequelize, Mysql para la base de datos.

Realizar este proyecto ha sido una gran oportunidad para poner en práctica los conocimientos que he adquirido en las últimas semanas sobre TypeScript. Durante el desarrollo, he aprendido a implementar interfaces, types y clases para seguir los principios de la Programación Orientada a Objetos. Además, también he tenido la oportunidad de realizar pruebas unitarias para asegurarme de que mi código funcionara correctamente.

Para llevar a cabo este proyecto, utilice las siguientes tecnologías: Express para crear el servidor, JWT para la autenticación, Sequelize como ORM y MySQL como base de datos.