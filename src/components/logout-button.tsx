"use client"

import { setCookie } from "cookies-next"
import ky from "ky"
import { useRouter } from "next/router"

import { Button } from "~/components/ui/button"
import { API_URL } from "~/lib/constants"

export function LogoutButton() {
  const router = useRouter()

  const logout = async () => {
    try {
      await ky.post(`${API_URL}/auth/logout`, { credentials: "include" })
      setCookie("access-token-set", false, { maxAge: 0 })
      router.reload()
    } catch (error) {
      console.error(error)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return <Button onClick={logout}>Log Out</Button>
}
