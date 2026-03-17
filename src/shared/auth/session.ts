import { jwtVerify } from "jose"

type JwtPayload = {
  exp?: number
}

const secret = new TextEncoder().encode(process.env.SESSION_JWT_SECRET ?? "")

export async function isSessionJwtValid(token?: string): Promise<boolean> {
  if (!token || !process.env.SESSION_JWT_SECRET) return false

  try {
    const { payload } = await jwtVerify<JwtPayload>(token, secret, {
      algorithms: ["HS256"],
    })

    if (payload.exp === undefined) return true
    if (typeof payload.exp !== "number") return false

    return Date.now() < payload.exp * 1000
  } catch {
    return false
  }
}
