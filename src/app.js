import fastify  from "fastify";
import cors from "@fastify/cors"

import userRoutes from "./routes/user.routes.js";

const app  = fastify({logger:{level:"info"}})

app.register(userRoutes, {prefix:"/"})

app.register(cors,{
    origin:"*"
})

export default app