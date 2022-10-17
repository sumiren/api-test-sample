import fastify  from 'fastify'
import { app } from "./app"

const main = async () => {
  const server = fastify({
    logger: {
      level: 'info'
    }
  })

  await server.register(app)

  server.listen({port: 8080}, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}

main()
