import { getCookie } from "cookies-next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"

import { DataTable } from "~/components/dogs/data-table"
import { LogoutButton } from "~/components/logout-button"
import { Button } from "~/components/ui/button"
import { usePagination } from "~/context/pagination-context"
import { useBreeds } from "~/hooks/dogs/useBreeds"
import { useDogs } from "~/hooks/dogs/useDogs"
import { useSearch } from "~/hooks/dogs/useSearch"
import { columns } from "~/lib/dogs/columns"

export default function Home() {
  const {
    state: { pageIndex, pageSize },
    dispatch,
  } = usePagination()

  const { data: allBreeds } = useBreeds()
  const { data: results, refetch: refreshSearch } = useSearch({
    breeds: ["Golden Retriever"],
    size: Number(pageSize).toString(),
    from: (pageIndex * pageSize).toString(),
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
            <DataTable columns={columns} data={dogs} />
          </>
        ) : (
          <>
            <p className="my-6 leading-7">
              Please log in to see our available dogs!
            </p>
            <Button asChild>
              <Link href="/login">Login</Link>
            </Button>
          </>
        )}
      </div>
    </>
  )
}
