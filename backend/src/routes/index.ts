import { FastifyInstance } from "fastify";

export default async function (fastify: FastifyInstance) {
    // create
    fastify.post('/', async () => {
        return { message: "User online"}
    }); 
  }