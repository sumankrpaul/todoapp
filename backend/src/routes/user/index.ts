import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
    fastify.get('/', async () => {
      return { message: "Users is online" }
    });
    fastify.get('/:id', async (request, reply) => {
        const {id} = request.params as {id: string}
        return { message: `User Id is ${id}` }
    });
  }