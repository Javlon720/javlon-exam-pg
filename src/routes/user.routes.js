import { postSignup, postSignin, getUserId } from "../schema/users.schema.js"
import {
  getUsersController,
  signinController,
  signupController,
} from "../controllers/user.controller.js"

export default async function userRoutes(fastify) {
  fastify.get(
    "/users",
    {
      schema: getUserId,
      onRequest: [fastify.authenticate],
    },
    getUsersController,
  )

  fastify.post(
    "/signup",
    {
      schema: {
        body: postSignup,
      },
    },
    signupController,
  )

  fastify.post(
    "/signin",
    {
      schema: postSignin,
    },
    signinController,
  )
}
