import { getUsers, signinUser, signupUser } from "../services/user.service.js"

function sendError(reply, error) {
  const statusCode = error.statusCode || 500
  const message =
    statusCode === 500 ? `server error ${error.message}` : error.message

  return reply.code(statusCode).send({ message })
}

export async function getUsersController(req, reply) {
  try {
    const users = await getUsers(req.user, req.query)
    return reply.code(200).send(users)
  } catch (error) {
    return sendError(reply, error)
  }
}

export async function signupController(req, reply) {
  try {
    const message = await signupUser(req.body)
    return reply.code(201).send(message)
  } catch (error) {
    return sendError(reply, error)
  }
}

export async function signinController(req, reply) {
  try {
    const result = await signinUser(req.body)
    const token = req.server.jwt.sign({
      id: result.user.id,
      email: result.user.email,
      is_admin: result.user.is_admin,
    })

    return reply.code(200).send({
      ...result,
      token,
    })
  } catch (error) {
    return sendError(reply, error)
  }
}
