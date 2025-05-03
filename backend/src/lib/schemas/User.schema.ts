import { z } from "zod";
import { buildJsonSchemas } from "fastify-zod";
import { responseSchema } from "./common.schema";

const userCore = z.object({
    id: z.number({ 
        required_error: "User Id is required",
        invalid_type_error: "User Id must be numneric"
     }),
    name: z.string({
        required_error: "User Name is required"
    }),
    email: z.string({
        required_error: "User Email is required",
        invalid_type_error: "Email must be valid"
    }).email(),
    firebaseId: z.string({
        required_error: "Firebase ID is required"
    })
})

const userResponseSchema = userCore.omit({ firebaseId: true });

const createUserSchema = userCore.omit({ id: true });

const createUserSuccessSchema = responseSchema(userResponseSchema)

const userListSchema = z.object({
    count: z.number(),
    users: z.array(userResponseSchema)
})

export type CreateUserRequest = z.infer<typeof createUserSchema>

export type User = z.infer<typeof userCore>

export type UserList = z.infer<typeof userListSchema>

export const { schemas: userSchemas, $ref  } = buildJsonSchemas({
    userResponseSchema,
    createUserSchema,
    createUserSuccessSchema,
    userListSchema
})
