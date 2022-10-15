import { test, expect } from "vitest"
import fastify from "fastify"
import { loginHandler } from "../../app/login-handler"


test('good', async() => {
  const server = fastify()
  await server.register(loginHandler)

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

