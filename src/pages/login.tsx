"use client"

import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { LoginForm } from "~/components/login-form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { cn } from "~/lib/utils"
import { league_spartan } from "~/styles/fonts"

export default function Login() {
  return (
    <>
      <Head>
        <title>BarkBuddy | Login</title>
        <meta name="description" content="Find your new furry companion!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="min-h-screen bg-muted">
        <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
          <Link
            href="/"
            className={cn(
              "mb-6 flex scroll-m-20 items-center font-sans text-2xl font-semibold tracking-tight text-foreground",
              league_spartan.variable
            )}
          >
            <Image
              className="mr-2"
              width={32}
              height={32}
              src="/favicon.ico"
              alt="logo"
            />
            BarkBuddy
          </Link>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl">Log In</CardTitle>
              <CardDescription>
                Enter your name and email below!
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}
