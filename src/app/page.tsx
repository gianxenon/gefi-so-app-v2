import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function HomePage() {
  // const cookieStore = await cookies()
  // const jwt = cookieStore.get("session")?.value

  redirect("/login") // jwt ? "/dashboard" : 
}
