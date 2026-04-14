import app from "./app.js"
import { config } from "./config/config.js"

async function start() {
    try {
        await app.listen({ port: config.port }, console.log(`${config.port} da yondi `))
    } catch (error) {
        console.log(error.message);
        
        process.exit(1)
    }
}


await start()

