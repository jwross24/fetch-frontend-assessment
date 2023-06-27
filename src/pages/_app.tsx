import { type AppType } from "next/dist/shared/lib/utils"
import { League_Spartan, Quicksand } from "next/font/google"
import "~/styles/globals.css"

const league_spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  display: "swap",
})

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  display: "swap",
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main
      className={`${quicksand.variable} ${league_spartan.variable} font-serif`}
    >
      <Component {...pageProps} />
    </main>
  )
}

export default MyApp
