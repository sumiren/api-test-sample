import { describe, test, expect, vi } from "vitest"
import { handler } from "../../app/login-handler"

describe("API Test Example: bad", () => {
  test('succeed', async () => {
    const mockCode = vi.fn();
    const mockSend = vi.fn();
    const request: any = {
      query: {
        username: "admin",
        password: "password"
      }
    };
    const reply: any = {
      code: mockCode,
      send: mockSend
    };
    const responseBody = await handler(request, reply);

    expect(responseBody).toStrictEqual({
      message: "you've logged in!"
    })
  })

  test('invalid username', async () => {
    const mockCode = vi.fn();
    const mockSend = vi.fn();
    const request: any = {
      query: {
        username: "admin2",
        password: "password"
      }
    };
    const reply: any = {
      code: mockCode,
      send: mockSend
    };
    mockCode.mockImplementation(() => reply) // method chain
    const responseBody = await handler(request, reply);

    expect(mockCode.mock.calls[0][0]).toStrictEqual(400)
    expect(mockSend.mock.calls[0][0]).toStrictEqual({message: "Must be admin"})
  })
});


