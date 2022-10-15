import fastify, {FastifyPluginAsync, FastifyRequest, FastifyReply} from 'fastify'


export const loginHandler: FastifyPluginAsync = (fastify) => {
  fastify.get<{ Querystring: IQuerystring }>('/login', handler)
  return Promise.resolve();
}

export const handler = async (request: FastifyRequest<{ Querystring: IQuerystring }>, reply: FastifyReply) => {
  const result = validateStatically(request)
  if (!result.noProblem) {
    reply.code(result.statusCode).send(result.payload)
    return
  }

  return {message: "you've logged in!"}
}

export const validateStatically = (request: FastifyRequest<{ Querystring: IQuerystring }>) => {
  const {username, password} = request.query;
  if (username !== 'admin') {
    return {statusCode: 400, payload: {message: "Must be admin"}}
  }
  if (password !== 'password') {
    return {statusCode: 400, payload: {message: "Invalid password"}}
  }
  return {noProblem: true} as const
}

interface IQuerystring {
  username: string;
  password: string;
}

interface IHeaders {
  'h-Custom': string;
}

