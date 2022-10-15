import {test, expect} from "vitest"
import {handler} from "../../app/login-handler"

test('bad', async() => {
  const responseBody = await handler(({
    query: {
      username: "admin",
      password: "password"
    }
  }) as any)

  expect(responseBody).toStrictEqual({
    message: "you've logged in!"
  })
})

