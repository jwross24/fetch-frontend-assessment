import Head from "next/head"

export default function Home() {
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
