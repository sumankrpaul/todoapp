import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userLookup } from "lib/plugins/firebase.auth";
import prisma from "lib/prisma";
import { userSchemas, $ref, CreateUserRequest, UserList } from "lib/schemas/User.schema";

export default async function (fastify: FastifyInstance) {
  for(const schema of [...userSchemas]){
    fastify.addSchema(schema);
  }  
  
  fastify.post('/', {
    schema:{
      body: $ref("createUserSchema"),
      response:{
        201: $ref("createUserSuccessSchema")
      }
    }
  },  async (request: FastifyRequest<{
    Body:CreateUserRequest
  }>, reply: FastifyReply) => {
    
    try{ 
      const firebaseId = request.body.firebaseId;
      const check = await prisma.user.count({ where: { firebaseId:firebaseId } });
      if(check){
        return reply.code(400).send({ message: "This user already exists " })
      }

      const firebaseRecord = await userLookup(firebaseId);
      if(!firebaseRecord || firebaseRecord.uid){
        return reply.code(400).send({ message: "Firebase Id does not exist" })
      } 

      const user = await prisma.user.create({data: { ...request.body }});
      return reply.code(201).send({ message: "User Created !", data: user })
    } catch (e){
      return reply.code(400).send({ message: "User can not be created" })
    }

  });

  fastify.get('/', {
    schema: {
      response: {
        200: $ref("userListSchema")
      }
    }},
    async ( request: FastifyRequest, reply: FastifyReply )=>{
      try{
        const [users, total] = await Promise.all([
          prisma.user.findMany(),
          prisma.user.count()
        ]) 

        return reply.code(200).send({
          count: total,
          users: users
        })
      } catch(err){
      return reply.code(500).send({ message: "Something went wrong" })
      }
    }
  )

  fastify.get('/:id', async (request, reply) => {
      const {id} = request.params as {id: string}
      return { message: `User Id is ${id}` }
  });
}