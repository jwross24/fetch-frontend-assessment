import { setCookie } from "cookies-next"
import ky from "ky-universal"
import type { NextApiRequest, NextApiResponse } from "next"

import type { FormValues as LoginFormValues } from "~/components/login-form"
import { API_URL } from "~/lib/constants"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email } = req.body as LoginFormValues

  const searchParams = new URLSearchParams()
  searchParams.set("name", name)
  searchParams.set("email", email)

  await ky.post(`${API_URL}/auth/login`, {
    body: searchParams,
  })

  setCookie("access-token-set", true, {
    req,
    res,
    maxAge: 60 * 60,
    path: "/",
  })

  res.status(200).send("OK")
}
