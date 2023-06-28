import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { type AppType } from "next/dist/shared/lib/utils"
import React from "react"
import { PaginationProvider } from "~/context/pagination-context"
import { quicksand } from "~/styles/fonts"
import "~/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <PaginationProvider>
        <main className={`${quicksand.variable} font-serif`}>
          <Component {...pageProps} />
        </main>
        <ReactQueryDevtools />
      </PaginationProvider>
    </QueryClientProvider>
  )
}

export default MyApp
