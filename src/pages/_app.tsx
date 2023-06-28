import { type AppType } from "next/dist/shared/lib/utils"
import { quicksand } from "~/styles/fonts"
import "~/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={`${quicksand.variable} font-serif`}>
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
