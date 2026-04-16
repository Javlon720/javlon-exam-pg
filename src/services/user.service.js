import argon from "argon2"

import { query } from "../plugin/db.js"
import {
  checkUser,
  createUser,
  getFullDate,
} from "../db/user.db.js"

function createError(statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function normalizeEmail(email) {
  return email.toLowerCase()
}

export async function getUsers(user, { page = 1, count = 10 }) {
  if (!user?.is_admin) {
    throw createError(403, "siz admin emassiz")
  }

  const result = await query(getFullDate, page, count)
  return result.rows
}

export async function signupUser({ email, password, age, gender, name, is_admin }) {
  const normalizedEmail = normalizeEmail(email)
  const existingUser = await query(checkUser, normalizedEmail)

  if (existingUser.rows.length > 0) {
    throw createError(401, `${normalizedEmail} al ready exist`)
  }

  const hashedPassword = await argon.hash(password)

  await query(
    createUser,
    normalizedEmail,
    hashedPassword,
    age,
    gender,
    name,
    is_admin,
  )

  return `welcome back ${normalizedEmail}`
}

export async function signinUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email)
  const existingUser = await query(checkUser, normalizedEmail)
  const user = existingUser.rows[0]

  if (!user) {
    throw createError(401, "Invalid email or password")
  }

  const isValidPassword = await argon.verify(user.password, password)

  if (!isValidPassword) {
    throw createError(401, "Invalid email or password")
  }

  return {
    message: `welcome back ${user.name}`,
    user: {
      id: user.id,
      email: user.email,
      age: user.age,
      gender: user.gender,
      name: user.name,
      is_admin: user.is_admin,
    },
  }
}
