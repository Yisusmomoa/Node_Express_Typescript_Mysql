import request from 'supertest'
import app from '..'

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2Rhc2RhZCIsImVtYWlsIjoidXMxQGdtYWlsLmNvbSIsImlhdCI6MTY4ODAxMzQ5NCwiZXhwIjoxNjg4MDE1Mjk0fQ.0zLjWGzxRfemrYsbYPiddzynsXhM3UZoD3oImtfMCDU'
const id = 19
describe('Users', () => {
  test('signUp, create user should respond with a 201', async () => {
    const newUser = {
      email: 'ustest@gmail.com',
      pass: '123',
      username: 'test'
    }
    const response = await request(app).post('/api/user/signup').send(newUser)
    expect(response.statusCode).toBe(201)
  })
  test('signIn, should respond 200 and a token', async () => {
    const user = {
      email: 'ustest@gmail.com',
      pass: '123'
    }
    const response = await request(app).post('/api/user/signin').send(user)
    expect(response.statusCode).toBe(200)
    expect(response.headers['set-cookie']).toBeDefined()
    expect(response.headers['set-cookie'][0]).toContain('token')
  })
  test('/me, should respond 200 and the user info', async () => {
    const response = await request(app)
      .get('/api/user/me')
      .set('Cookie', `token =${TOKEN}`)
    expect(response.statusCode).toBe(200)
    expect(response.body.result).toBeDefined()
  })
})

describe('Todos', () => {
  test('/, should respond with a status code 200 with an array of todos from the user loged',
    async () => {
      const response = await request(app).get('/api/todo/').set('Cookie', `token =${TOKEN}`)
      expect(response.statusCode).toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    })

  test('/, create todo', async () => {
    const newPost = {
      title: 'todo test',
      description: 'descr todo test'
    }
    const response = await request(app).post('/api/todo/').send(newPost).set('Cookie', `token =${TOKEN}`)
    expect(response.statusCode).toBe(201)
  })
  test('/:id, should respond with a status code 200 and a todo', async () => {
    const response = await request(app).get(`/api/todo/${id}`).set('Cookie', `token =${TOKEN}`)
    expect(response.statusCode).toBe(200)
  })
  test('/:id, update info todo', async () => {
    const infoUpdate = {
      title: 'test update'
    }
    const response = await request(app).put(`/api/todo/${id}`).send(infoUpdate).set('Cookie', `token =${TOKEN}`)
    expect(response.statusCode).toBe(200)
  })
  test('/:id, update status todo', async () => {
    const response = await request(app).patch(`/api/todo/${id}`).set('Cookie', `token =${TOKEN}`)
    expect(response.statusCode).toBe(200)
  })
  test('/:id, delete todo', async () => {
    const response = await request(app).delete(`/api/todo/${id}`).set('Cookie', `token =${TOKEN}`)
    expect(response.statusCode).toBe(200)
  })
})
