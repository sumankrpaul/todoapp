import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { userResponseSchema } from "./User.schema";
import { responseSchema } from "./common.schema";

const TodoStatusEnum = z.enum(["DRAFT","INPOGRESS","HOLD","COMPLETED"]);

const TodosCore = z.object({
    id: z.number(),
    title: z.string({
        required_error: "Title of a TODO is required"
    }),
    description: z.string({
        required_error: "Description for TODO is required"
    }),
    status: TodoStatusEnum,
    createdAt: z.string({
       invalid_type_error: "Create At should be datetime string" 
    }).datetime(),
    updateAt: z.string({
        invalid_type_error: "Updated At should be datetime string"
    }).datetime().nullable().optional(),
    createdBy: userResponseSchema,
    ownerId: z.number(),
    sharedTo: userResponseSchema.optional(),
    sharedId: z.number().nullable().optional(),
    sharedOn: z.string({
       invalid_type_error: "Shared At should be valid datetime string" 
    }).datetime().nullable().optional(),
    complatedOn:z.string({
        invalid_type_error: "Shared At should be valid datetime string" 
     }).datetime().nullable().optional()
})

const createTodoRequest = TodosCore.omit({ 
    id: true,
    createdBy: true, 
    sharedOn: true, 
    sharedTo: true, 
    complatedOn: true,
    updateAt: true
});

export type CreateTodoRequestBody = z.infer<typeof createTodoRequest> 

const createTodoSuccessResp = responseSchema(TodosCore);

export type CreateTodoSuccessResp = z.infer<typeof createTodoSuccessResp>

const todoListSchemaResponse = z.object({
    count: z.number(),
    todos: z.array(TodosCore)
})

export type TodoListResponse = z.infer<typeof todoListSchemaResponse> 


export const {schemas: todoSchemas, $ref } = buildJsonSchemas({
    createTodoSuccessResp  
})
