import { useQuery } from "@tanstack/react-query"
import { getCookie } from "cookies-next"
import ky from "ky"

import { API_URL } from "~/lib/constants"
import { type SearchResults } from "~/lib/interfaces"

interface SearchQueryParams {
  breeds?: string[]
  zipCodes?: string[]
  ageMin?: string
  ageMax?: string
  size?: string
  from?: string
  sort?: string
}

const search = async (queryParams: SearchQueryParams) => {
  if (!getCookie("access-token-set")) {
    return { resultIds: [], total: 0 }
  }

  const { breeds: _breeds, zipCodes: _zipCodes, ...rest } = queryParams

  const breeds = _breeds || []
  const breedParams: string[][] = []
  breeds.forEach((breed: string) => breedParams.push(["breeds", breed]))

  const zipCodes = _zipCodes || []
  const zipCodeParams: string[][] = []
  zipCodes.forEach((zipCode: string) =>
    zipCodeParams.push(["zipCodes", zipCode])
  )

  const restParams = Object.entries(rest)
  const searchParams = new URLSearchParams([
    ...breedParams,
    ...zipCodeParams,
    ...restParams,
  ])

  const results = await ky(`${API_URL}/dogs/search`, {
    credentials: "include",
    searchParams: searchParams,
  }).json<SearchResults>()

  return results
}

const useSearch = (queryParams: SearchQueryParams) => {
  return useQuery(
    ["search", { ...queryParams }],
    () => search({ ...queryParams }),
    {
      cacheTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
    }
  )
}

export { search, useSearch }
