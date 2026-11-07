"use client"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Logo } from "@/components/logo"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"

export default function SignUpPage() {
  const router = useRouter()

  const handleEmailSignUp = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      image: string
      email: string
      password: string
    }

    const { data, error } = await authClient.signUp.email({
      name: user.name,
      email: user.email,
      password: user.password,
      image: user.image.trim() ? user.image.trim() : undefined,
    })

    if (data) {
      router.push("/login")
    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
        <div className="flex justify-center">
          <Link href="/" aria-label="GoodWork home">
            <Logo variant="on-light" />
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-2 rounded-full bg-slate-100 p-1 text-sm font-bold">
          <span className="rounded-full bg-white py-2 text-center text-slate-900 shadow-sm">
            Sign Up
          </span>
          <Link
            href="/login"
            className="rounded-full py-2 text-center text-slate-500 transition-colors hover:text-slate-900"
          >
            Sign In
          </Link>
        </div>

        <form onSubmit={handleEmailSignUp} className="pt-6">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                required
                className="h-11 rounded-xl bg-slate-50"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="image">
                Profile Image URL{" "}
                <span className="text-xs font-normal text-slate-500">
                  (optional)
                </span>
              </FieldLabel>
              <Input
                id="image"
                type="url"
                name="image"
                placeholder="https://example.com/image.jpg"
                className="h-11 rounded-xl bg-slate-50"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
                className="h-11 rounded-xl bg-slate-50"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                name="password"
                type="password"
                required
                className="h-11 rounded-xl bg-slate-50"
              />
            </Field>
            <Field>
              <Button
                type="submit"
                className="h-12 w-full rounded-full text-base"
              >
                Create Account
              </Button>
              <FieldDescription className="text-center">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold text-brand hover:underline">
                  Sign in
                </Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>

        <FieldSeparator className="*:data-[slot=field-separator-content]:bg-white">
          Or connect with
        </FieldSeparator>

        <div className="flex gap-3">
          <Button
            variant="outline"
            type="button"
            aria-label="Continue with email"
            className="h-11 flex-1 rounded-xl"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Email
          </Button>
          <Button
            variant="outline"
            type="button"
            aria-label="Continue with Google"
            className="h-11 flex-1 rounded-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Google
          </Button>
        </div>
      </div>

      <p className="px-6 pt-4 text-center text-xs text-muted-foreground">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </p>
    </div>
  )
}
