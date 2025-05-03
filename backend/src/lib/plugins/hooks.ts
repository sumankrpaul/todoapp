import { FastifyReply, FastifyRequest } from "fastify";
import { verifyToken } from "./firebase.auth";

declare module 'fastify' {
    interface FastifyRequest {
        firebaseId?: string;
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
        request.firebaseId = user;
    }else {
        return reply.code(401).send({error: "Invalid or Expired token"});
    }

}