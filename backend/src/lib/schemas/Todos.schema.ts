import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { userResponseSchema } from "./User.schema";
import { responseSchema } from "./common.schema";

const TodoStatusEnum = z.enum(["DRAFT","INPOGRESS","HOLD","COMPLETED"]);

export const TodosCore = z.object({
    id: z.number(),
    title: z.string({
        required_error: "Title of a TODO is required"
    }),
    description: z.string({
        required_error: "Description for TODO is required"
    }),
    status: TodoStatusEnum,
    createdAt: z.date({
       invalid_type_error: "Create At should valid date" 
    }),
    updateAt: z.date({
        invalid_type_error: "Updated At should valid date"
    }).nullable().optional(),
    createdBy: userResponseSchema,
    ownerId: z.number(),
    sharedTo: userResponseSchema.nullable().optional(),
    sharedId: z.number().nullable().optional(),
    sharedOn: z.date({
       invalid_type_error: "Shared At should be valid date" 
    }).nullable().optional(),
    complatedOn:z.date({
        invalid_type_error: "Shared At should be valid date" 
     }).nullable().optional()
})

const createTodoRequest = TodosCore.omit({ 
    id: true,
    ownerId: true,
    createdAt: true,
    createdBy: true, 
    sharedOn: true, 
    sharedTo: true, 
    complatedOn: true,
    updateAt: true
});

export type CreateTodoRequestBody = z.infer<typeof createTodoRequest> 

export const createTodoSuccessResp = responseSchema(TodosCore);

export type CreateTodoSuccessResp = z.infer<typeof createTodoSuccessResp>

const todoListSchemaResponse = z.object({
    count: z.number(),
    todos: z.array(TodosCore)
})

export type TodoListResponse = z.infer<typeof todoListSchemaResponse> 

const todoDetailsResponse = z.object({
    detail: TodosCore
})


export const {schemas: todoSchemas, $ref } = buildJsonSchemas({
    createTodoRequest,
    createTodoSuccessResp,
    todoListSchemaResponse,
    todoDetailsResponse
})
