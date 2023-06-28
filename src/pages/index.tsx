import { getCookie } from "cookies-next"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const navigateToLogin = async () => {
      await router.replace("/login")
    }
    if (!getCookie("access-token-set")) {
      navigateToLogin().catch(console.error)
    }
  }, [router])

  return (
    <>
      <Head>
        <title>BarkBuddy</title>
        <meta name="description" content="Find your new furry companion!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center">
        BarkBuddy
      </div>
    </>
  )
}
