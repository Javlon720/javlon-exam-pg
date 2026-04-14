import { Pool } from "pg"
import {config} from "../config/config.js"

const pool = new Pool({
    port: config.pg_port,
    host: config.pg_host,
    user: config.pg_user,
    database: config.pg_database,
    password: config.pg_password
});



export async function query(sql, ...params) {
    const client = await pool.connect()

    try {
        const result = await client.query(sql, params)
        return result
    } catch (error) {
        console.error(error)
        throw error
    } finally {
        client.release()
    }
}