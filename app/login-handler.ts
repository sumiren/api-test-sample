import fastify, { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify'


export const loginHandler: FastifyPluginAsync = (fastify) => {
  fastify.get<{ Querystring: IQuerystring }>('/login', handler)
  return Promise.resolve();
}

export const handler = async (request: FastifyRequest<{Querystring: IQuerystring}>) => {
  validateStatically(request)
  return { message: "you've logged in!" };
}

export const validateStatically = (request: FastifyRequest<{Querystring: IQuerystring}>) => {
  const { username, password } = request.query;
  if (username !== 'admin') {
    throw new Error("Must be admin")
  }
  if (password !== 'password') {
    throw new Error("Wrong password")
  }
}

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}
