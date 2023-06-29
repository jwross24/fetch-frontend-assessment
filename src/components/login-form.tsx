"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { ReloadIcon } from "@radix-ui/react-icons"
import { setCookie } from "cookies-next"
import ky from "ky"
import { useRouter } from "next/router"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import * as z from "zod"

import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { API_URL } from "~/lib/constants"

const formSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
})

export type FormValues = z.infer<typeof formSchema>

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  const onLogin: SubmitHandler<FormValues> = async ({ name, email }) => {
    try {
      setIsLoading(true)

      const searchParams = new URLSearchParams()
      searchParams.set("name", name)
      searchParams.set("email", email)

      await ky.post(`${API_URL}/auth/login`, {
        body: searchParams,
        credentials: "include",
      })

      setCookie("access-token-set", true, {
        maxAge: 60 * 60,
        path: "/",
      })

      setIsLoading(false)

      await router.push("/")
    } catch (error) {
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onLogin)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" autoComplete="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="m@example.com"
                  autoComplete="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}{" "}
          Log In
        </Button>
      </form>
    </Form>
  )
}
