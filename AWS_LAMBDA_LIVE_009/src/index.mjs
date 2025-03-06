import { response } from './utils/response.mjs'
import jwt from 'jsonwebtoken'
import { randomUUID } from 'node:crypto'

export async function handler(event) {
  const token = jwt.sign(
    {
      sub: randomUUID()
    },
    process.env.JWT_SECRET
  )
  return response(200, {
    users: [
      {
        id: randomUUID(),
        name: 'Leo',
        token
      }
    ]
  })
}
