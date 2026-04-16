export const postSignup = {
    type: 'object',
    required: ['email', "password", "age", "gender", "name"],
    properties: {
        name: { type: "string" },
        email: { type: 'string', format: "email" },
        password: { type: "string", minLength: 6 },
        age: { type: "integer", minimum: 1 },
        is_admin: { type: 'boolean', default: false },
        gender: { type: "string", enum: ['male', "female"] }
    }
}

export const postSignin = {
    body: {
        type: "object",
        required: ["password", "email"],
        properties: {
            password: { type: 'string', minLength: 6 },
            email: { type: 'string', format: 'email' }
        }
    }
}

export const getUserId = {
    querystring: {
        type: 'object',
        required: ["page", "count"],
        properties: {
            page: { type: "integer", default: 1 },
            count: { type: 'integer', default: 10 }
        }
    }
}
