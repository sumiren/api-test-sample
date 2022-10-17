import { FastifyPluginAsync } from 'fastify'
import { loginHandler } from './login-handler'

export const app: FastifyPluginAsync = async (fastify) => {
  await fastify.register(loginHandler)
}
