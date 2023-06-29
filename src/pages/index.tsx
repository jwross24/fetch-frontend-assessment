import { type SortingState } from "@tanstack/react-table"
import { getCookie } from "cookies-next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import { columns } from "~/components/dogs/columns"
import { DataTable } from "~/components/dogs/data-table"
import { LogoutButton } from "~/components/logout-button"
import { Button } from "~/components/ui/button"
import { useColumnFilters } from "~/context/column-filter-context"
import { usePagination } from "~/context/pagination-context"
import { useDogs } from "~/hooks/dogs/useDogs"
import { useSearch } from "~/hooks/dogs/useSearch"
import { league_spartan } from "~/styles/fonts"

export default function Home() {
  const {
    state: { pageIndex, pageSize },
    dispatch,
  } = usePagination()
  const { columnFilters } = useColumnFilters()

  const breeds = columnFilters.find(
    (columnFilter) => columnFilter.id === "breed"
  )

  const ages = columnFilters.find((columnFilter) => columnFilter.id === "age")
  let filteredAges: number[] = []
  if (ages) {
    filteredAges = (ages?.value as string[]).map((age) => parseInt(age))
  }

  const [sorting, setSorting] = useState<SortingState>([
    { id: "breed", desc: false },
  ])

  const sortParam = (sorting: SortingState) => {
    const [sort] = sorting
    if (sort) {
      const direction = sort.desc ? "desc" : "asc"
      return `${sort.id}:${direction}`
    } else {
      return ""
    }
  }

  const { data: results, refetch: refreshSearch } = useSearch({
    breeds: (breeds?.value as string[]) || [],
    ageMin: filteredAges.length > 0 ? Math.min(...filteredAges).toString() : "",
    ageMax: filteredAges.length > 0 ? Math.max(...filteredAges).toString() : "",
    size: Number(pageSize).toString(),
    from: (pageIndex * pageSize).toString(),
    sort: sortParam(sorting),
  })
  const { data: dogs } = useDogs(results?.resultIds || [])

  useEffect(() => {
    if (results?.total) {
      dispatch({ type: "TOTAL_COUNT_CHANGED", payload: results?.total })
    }
  }, [dispatch, results?.total])

  useEffect(() => {
    const refetch = async () => {
      await refreshSearch()
    }

    try {
      void refetch()
    } catch (error) {
      console.error(error)
    }
  }, [pageIndex, refreshSearch])

  const isAccessTokenSet = getCookie("access-token-set")

  return (
    <>
      <Head>
        <title>BarkBuddy</title>
        <meta name="description" content="Find your new furry companion!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative flex min-h-screen flex-col items-center bg-muted">
        {isAccessTokenSet && (
          <div className="absolute right-2 top-2 inline-block">
            <LogoutButton />
          </div>
        )}
        <Image
          src="/logo.png"
          alt="BarkBuddy logo"
          width="200"
          height="200"
          priority
        />
        {isAccessTokenSet ? (
          <>
            <div className="text-center">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Welcome to{" "}
                <span className={`font-sans ${league_spartan.variable}`}>
                  BarkBuddy
                </span>
                ! Begin Your Dog Search Here!
              </h2>
              <p className="my-6 leading-7">
                Below, you&apos;ll find a list of available dogs in shelters
                near you. Use the search filters to refine your search and find
                the perfect furry companion.
              </p>
            </div>
            <DataTable
              columns={columns}
              data={dogs}
              sort={{ sorting, setSorting }}
            />
          </>
        ) : (
          <div className="text-center">
            <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
              Log In to Find Your Perfect Companion!
            </h2>
            <p className="my-6 leading-7">
              Log in to explore a database of adorable shelter dogs waiting for
              their forever homes.
            </p>
            <Button asChild>
              <Link href="/login">Log In</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
