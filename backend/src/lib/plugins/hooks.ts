import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "./firebase.auth";
import { User } from "lib/schemas/User.schema";
import prisma from "lib/prisma";

declare module 'fastify' {
    interface FastifyRequest {
        user?: User 
    }
}

export const onRequestAuth = async( request: FastifyRequest, reply: FastifyReply )=>{
    const authHeader = request.headers.authorization;
    
    if(!authHeader?.startsWith("Bearer")){
        return reply.code(401).send({ error: 'Missing or invalid token' });
    }

    const token = authHeader.split(' ')[1];

    const user = await verifyToken(token);
    if(user){
        const userDetails = await prisma.user.findUnique({where: { firebaseId: user }});
        if(userDetails){
            request.user = userDetails;
            return;
        }
    }
    return reply.code(401).send({error: "Invalid or Expired token"});
}