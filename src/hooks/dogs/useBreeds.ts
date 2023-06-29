import { getCookie } from "cookies-next"
import ky from "ky"
import { useQuery } from "@tanstack/react-query"

import { API_URL } from "~/lib/constants"

const fetchBreeds = async () => {
  if (!getCookie("access-token-set")) return []

  const breeds = await ky(`${API_URL}/dogs/breeds`, {
    credentials: "include",
  }).json<string[]>()

  return breeds
}

const useBreeds = () => {
  const { data, ...rest } = useQuery(["breeds"], () => fetchBreeds(), {
    cacheTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
  })

  return {
    data: data || [],
    ...rest,
  }
}

export { fetchBreeds, useBreeds }
