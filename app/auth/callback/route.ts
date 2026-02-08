import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")
  const redirectTo = searchParams.get("redirectTo") || "/journal"

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      const url = origin + redirectTo
      return NextResponse.redirect(url)
    }
  }

  const errorUrl = origin + "/login?error=auth_error"
  return NextResponse.redirect(errorUrl)
}
