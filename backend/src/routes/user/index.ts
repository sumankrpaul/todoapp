import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userLookup } from "lib/plugins/firebase.auth";
import { onRequestAuth } from "lib/plugins/hooks";
import prisma from "lib/prisma";
import { userSchemas, $ref, CreateUserRequest } from "lib/schemas/User.schema";

export default async function (fastify: FastifyInstance) {
  for(const schema of [...userSchemas]){
    fastify.addSchema(schema);
  }  

  fastify.route({
    method: 'POST',
    url:'/',
    schema: {
      body: $ref("createUserSchema"),
      response:{
        201: $ref("createUserSuccessSchema")
      }
    },
    handler: async (request: FastifyRequest<{
      Body:CreateUserRequest
    }>, reply: FastifyReply) => {
      
      try{ 
        const firebaseId = request.body.firebaseId;
        const check = await prisma.user.count({ where: { firebaseId:firebaseId } });
        if(check){
          return reply.code(400).send({ error: "This user already exists " })
        }
  
        const firebaseRecord = await userLookup(firebaseId);
        if(!firebaseRecord || !firebaseRecord.uid){
          return reply.code(400).send({ error: "Firebase Id does not exist" })
        } 
  
        const user = await prisma.user.create({data: { ...request.body }});
        return reply.code(201).send({ message: "User Created !", data: user })
      } catch (e){
        return reply.code(400).send({ error: "User can not be created" })
      }
  
    }
  })

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response: {
        200: $ref("userListSchema")
      }
    },
    preHandler: onRequestAuth,
    handler: async ( request: FastifyRequest, reply: FastifyReply )=>{
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
      return reply.code(500).send({ error: "Something went wrong" })
      }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/profile',
    schema: {
      response:{
        200: $ref("userProfileResponseSchema")
      }
    },
    preHandler: onRequestAuth,
    handler: async(request: FastifyRequest, reply: FastifyReply)=>{
      try {
        if(request.user){
          return reply.code(200).send({
            detail: request.user
          })
        }
        return reply.code(401).send({ error:"User not found" });
      } catch (err){
        return reply.code(500).send({ error: "Something went wrong" })
      }
    }
  })

  

  fastify.get('/:id', async (request, reply) => {
      const {id} = request.params as {id: string}
      return { error: `User Id is ${id}` }
  });

}