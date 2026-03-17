import { checkSession, LoginResult, loginWithCredentials } from "@/infrastructure/data-sources/auth/login"

 
type LoginSubmitInput = {
  userid: string
  password: string
  company: string
}
type UserProfile = {
  userid: string
  name: string
  groupid: string
  saleschannel: string
  defchannel: string
  soconfirmation: string
}

type MeResponse = {
  user?: UserProfile
}

// Application use-case: check whether an authenticated session exists.
export async function initializeLogin(): Promise<{
  authenticated: boolean
  user?: UserProfile
}> {
  const authenticated = await checkSession()
  if (!authenticated) return { authenticated }

  try {
    const res = await fetch("/api/auth/me", { cache: "no-store" })
    if (!res.ok) return { authenticated }

    const data = (await res.json()) as MeResponse
    return { authenticated, user: data.user }
  } catch {
    return { authenticated }
  }
}



// Application use-case: submit credentials and return a framework-agnostic result.
export async function submitLogin(input: LoginSubmitInput): Promise<LoginResult> {
  return loginWithCredentials(input.userid, input.password, input.company)
}
