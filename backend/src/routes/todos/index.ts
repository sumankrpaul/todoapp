import { FastifyInstance, FastifyRequest } from "fastify";
import { onRequestAuth } from "lib/plugins/hooks";
import prisma from "lib/prisma";
import { $ref, CreateTodoRequestBody,TodosCore, CreateTodoSuccessResp, todoSchemas } from "lib/schemas/Todos.schema";

export default async function (fastify: FastifyInstance) {
  for(const schema of [...todoSchemas]){
    fastify.addSchema(schema);
  }

  fastify.route({
    method: 'POST',
    url: '/',
    preHandler: onRequestAuth,
    schema: {
      body: $ref("createTodoRequest"),
      response:{
        201: $ref("createTodoSuccessResp")
      }
    },
    handler: async(request: FastifyRequest<{Body: CreateTodoRequestBody}> , reply)=>{
      try{
        const todo = request.body;
        if(request.user){
  
          const newTodo = await prisma.todos.create({
            data: {
              ...todo,
              ownerId: request.user.id
            }
          })
  
          const response: CreateTodoSuccessResp = {
            message: "New Todos Created",
            data: TodosCore.parse({ ...newTodo, createdBy: request.user})
          }
  
          reply.code(201).send(response);
  
        }
  
        return reply.code(401).send({ error: "User does not exists" });
  
      } catch (e) {
        console.log(e);
        return reply.code(500).send({ error: "Todos can not be created" })
      }
    }
  })

  fastify.route({
    method: 'GET',
    url: '/',
    schema: {
      response:{
        200: $ref('todoListSchemaResponse')
      }
    },
    preHandler: onRequestAuth,
    handler: async(request, reply)=>{
      try{
        if(request.user){
          const [todoList, count] = await Promise.all([
            prisma.todos.findMany({
              include: {
                createdBy: true,
                sharedTo: true
              }
          }),
          prisma.todos.count()
        ])
  
          return reply.code(200).send({
            count: count,
            todos: todoList
          })
  
        }
      } catch(e){
        console.log(e);
        return reply.code(500).send({ error: "Todos can not be created" })
      }
    }
  })

     
}