import { describe, test, expect } from "vitest"
import fastify from "fastify"
import { app } from "../../app/app"


describe("API Test Example: good", () => {
  test('succeed', async () => {
    const server = fastify()
    await server.register(app)

    const response = await server.inject({
      method: 'GET',
      url: '/login?username=admin&password=password'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers["content-type"]).contains("application/json")
    expect(JSON.parse(response.body)).toStrictEqual({
      message: "you've logged in!"
    })
  })

  test('invalid username', async () => {
    const server = fastify()
    await server.register(app)

    const response = await server.inject({
      method: 'GET',
      url: '/login?username=admin2&password=password'
    })

    expect(response.statusCode).toBe(400)
    expect(response.headers["content-type"]).contains("application/json")
    expect(JSON.parse(response.body)).toStrictEqual({
      message: "Must be admin"
    })
  })

  test('invalid password', async () => {
    const server = fastify()
    await server.register(app)

    const response = await server.inject({
      method: 'GET',
      url: '/login?username=admin&password=password2'
    })

    expect(response.statusCode).toBe(400)
    expect(response.headers["content-type"]).contains("application/json")
    expect(JSON.parse(response.body)).toStrictEqual({
      message: "Invalid password"
    })
  })

});

