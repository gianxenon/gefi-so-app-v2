import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { z } from "zod"
import { isSessionJwtValid } from "@/shared/auth/session"

const phpMeSchema = z.object({
  ok: z.literal(true),
  user: z.object({
    userid: z.string(),
    name: z.string().optional(),
    groupid: z.string().optional(),
    saleschannel: z.string().optional(),
    defchannel: z.string().optional(),
    soconfirmation: z.string().optional(),
  }),
})

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get("session")?.value

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const valid = await isSessionJwtValid(token)
  if (!valid) {
    const res = NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    res.cookies.set("session", "", { path: "/", maxAge: 0 })
    return res
  }
  
  const company = cookieStore.get("company")?.value || "GEFI"
  const base = company === "GEFI" ? process.env.API_GEFI : process.env.API_HFI

  if (!base) {
    return NextResponse.json({ message: "Missing PHP base" }, { status: 500 })
  }
 
  const userid = ""  

  const phpRes = await fetch(`${base}/udp.php?objectcode=me`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ userid, jwt: token }),
    cache: "no-store",
  })

  const raw = await phpRes.text()
  let parsed: unknown
  try {
    parsed = raw ? JSON.parse(raw) : null
  } catch {
    return NextResponse.json({ message: "PHP returned non-JSON", raw }, { status: 502 })
  }

  const result = phpMeSchema.safeParse(parsed)
  if (!phpRes.ok || !result.success) {
    return NextResponse.json(
      { message: "Unauthorized", raw },
      { status: 401 }
    )
  }

  return NextResponse.json({ user: result.data.user })
}
