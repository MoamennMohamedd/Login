"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { loginUser } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const emailValidationError = emailTouched && email.length > 0 && !isEmailValid(email) ? "Invalid email format" : null
  const passwordValidationError = passwordTouched && password.length === 0 ? "Password cannot be empty" : null

  const isFormValid = email.length > 0 && password.length > 0 && isEmailValid(email)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isFormValid) return
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const formData = new FormData(e.currentTarget)
      const result = await loginUser({ message: null }, formData)
      
      if (result.message) {
        setError(result.message)
      } else {
        // Redirect on successful login
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-figma-light-purple to-figma-pink-purple p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl bg-transparent rounded-xl overflow-hidden lg:grid lg:grid-cols-2">
        {/* Left Section: Login Form */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-figma-dark-text">Welcome back</h1>
            <p className="text-figma-grey-text text-lg">
              Step into our shopping metaverse for an unforgettable shopping experience
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-figma-grey-text" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null) // Clear error when user starts typing
                }}
                onBlur={() => setEmailTouched(true)}
                className={`pl-10 py-2 h-12 rounded-lg border ${
                  emailValidationError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-figma-border focus:ring-figma-button-purple focus:border-figma-button-purple"
                } focus:ring-1 text-figma-dark-text`}
              />
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
              {emailValidationError && (
                <p className="mt-1 text-sm text-red-500">{emailValidationError}</p>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-figma-grey-text" />
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setError(null) // Clear error when user starts typing
                }}
                onBlur={() => setPasswordTouched(true)}
                className={`pl-10 py-2 h-12 rounded-lg border ${
                  passwordValidationError
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "border-figma-border focus:ring-figma-button-purple focus:border-figma-button-purple"
                } focus:ring-1 text-figma-dark-text`}
              />
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              {passwordValidationError && (
                <p className="mt-1 text-sm text-red-500">{passwordValidationError}</p>
              )}
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="w-full h-12 bg-figma-button-purple hover:bg-figma-button-purple/90 text-white text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-figma-grey-text">
            Don&apos;t have an account?{" "}
            <Link href="#" className="font-medium hover:underline text-figma-button-purple">
              Sign up
            </Link>
          </div>
        </div>

        {/* Right Section: Image and Logo */}
        <div className="relative hidden lg:flex items-center justify-center bg-transparent p-8">
          <Image
            src="/image.png"
            alt="VR Experience Placeholder"
            width={400}
            height={400}
            className="object-contain max-w-full max-h-full rounded-lg"
            priority
          />
        </div>
      </div>
    </div>
  )
}
