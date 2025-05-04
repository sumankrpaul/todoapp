import Fastify from "fastify";
import AutoLoad from '@fastify/autoload';
import cors from '@fastify/cors';
import path from 'path';
import prisma from "lib/prisma";

const PORT = process.env.PORT || 4000;

function buildServer() {
    const server = Fastify({ logger: true });

    server.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: { prefix: '/api' },
        forceESM: false, // Set to true if using ESM
    })

    server.register(cors, {
        origin: (origin, cb) => {
            console.log("origin  ", origin);
            if (origin) {
                const hostname = new URL(origin).hostname;
                if (hostname === 'localhost') {
                    cb(null, true)
                    return;
                }
                cb(new Error("Not Allowed"), false);
            }
            cb(null, true)
        }
    })

    return server;
}


async function main() {
    try {
        const server = buildServer();
        await server.listen(PORT, "0.0.0.0");
        server.log.info(`Server is running in port ${PORT}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    } finally {
        prisma.$disconnect()
    }
}

main();

