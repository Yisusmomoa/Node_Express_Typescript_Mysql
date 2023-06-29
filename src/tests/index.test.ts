import request from 'supertest'
import app from '..'

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
      .set('Cookie',
        'token = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhc2Rhc2RhZCIsImVtYWlsIjoidXMxQGdtYWlsLmNvbSIsImlhdCI6MTY4Nzk5OTM0OSwiZXhwIjoxNjg4MDAxMTQ5fQ.l_gZst12X9PB8-tmTXDXeJEWpAmIBI0xq0Iemmp1DnU')
    expect(response.statusCode).toBe(200)
    expect(response.body.result).toBeDefined()
  })
})
