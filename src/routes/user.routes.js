import argon from "argon2"

import { query } from "../plugin/db.js"
import { checkUser, createUser, checkUserId, getFullDate } from "../db/user.db.js"
import { postSignup, postSignin, getUserId } from "../schema/users.schema.js"

export default async function userRoutes(fastify) {
  fastify.get('/users', {
    schema: getUserId
}, async (req, reply) => {
    const { user_id, page, count } = req.query

    const adminUser = await query(checkUserId, user_id)

    if (!adminUser.rows[0]?.is_admin) {
        return reply.code(403).send({ message: "siz admin emassiz" })
    }

    const result = await query(getFullDate, page, count)
    return reply.code(200).send(result.rows)
})


    fastify.post('/signup', {

        schema: {
            body: postSignup
        }
    },
        async (req, reply) => {
            try {
                const { email, password, age, gender, name, is_admin } = req.body

                const normalizedEmail = email.toLowerCase()
                const existUser = await query(checkUser, normalizedEmail)


                if (existUser.rows.length > 0) {
                    return reply.code(401).send({ message: `${normalizedEmail} al ready exist` })
                }
                const hashedPassword = await argon.hash(password)

                await query(createUser, normalizedEmail, hashedPassword, age, gender, name, is_admin)

                return reply.code(201).send(`welcome back ${normalizedEmail}`)

            } catch (error) {
                return reply.code(500).send(`server error  ${error}`)
            }
        }
    ),


        fastify.post('/signin',
            {
                schema: postSignin
            },
            async (req, reply) => {

                try {
                    const { password, email } = req.body
                    const normalizedEmail = email.toLowerCase()
                    const existingUser = await query(checkUser, normalizedEmail)

                    const user = existingUser.rows[0]


                    const validatePassword = await argon.verify(user.password, password)

                    if (!user & !validatePassword) {
                        return reply.code(401).send({ message: "Invalid email or password" })
                    }

                    return reply.code(200).send({ message: `welcome back ${user.name} id_admin ${user.is_admin} sizning id ${user.id}` })

                } catch (error) {

                    return reply.code(500).send(`server error  ${error}`)
                }
            })
}