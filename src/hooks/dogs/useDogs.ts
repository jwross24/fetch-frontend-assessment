import { getCookie } from "cookies-next"
import ky from "ky"
import { useQuery } from "@tanstack/react-query"

import { API_URL } from "~/lib/constants"
import { type Dog } from "~/lib/interfaces"

const fetchDogs = async (dogIds: string[]) => {
  if (!getCookie("access-token-set")) return []

  const dogs = await ky
    .post(`${API_URL}/dogs`, {
      credentials: "include",
      json: dogIds,
    })
    .json<Dog[]>()

  return dogs
}

const useDogs = (dogIds: string[]) => {
  const { data, ...rest } = useQuery(
    ["dogs", { dogIds }],
    () => fetchDogs(dogIds),
    {
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  )

  return {
    data: data || [],
    ...rest,
  }
}

export { fetchDogs, useDogs }
