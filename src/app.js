import fastify  from "fastify";
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"

import userRoutes from "./routes/user.routes.js";
import { config } from "./config/config.js";

// const app  = fastify({logger:{level:"info"}})
const app = fastify()

app.register(cors,{
    origin:"*"
})

app.register(jwt, {
    secret: config.jwt_secret,
})

app.decorate("authenticate", async function authenticate(req, reply) {
    try {
        await req.jwtVerify()
    } catch (error) {
        return reply.code(401).send({ message: "Invalid or missing token" })
    }
})

app.register(userRoutes, {prefix:"/"})

export default app
