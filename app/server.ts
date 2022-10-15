import { loginHandler } from "./login-handler"
import fastify  from 'fastify'

const main = async () => {
  const server = fastify({
    logger: {
      level: 'info'
    }
  })

  await server.register(loginHandler)

  server.listen({port: 8080}, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

main()
