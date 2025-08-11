"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Component() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e9ecf2] to-[#e477f6] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden lg:grid lg:grid-cols-2">
        {/* Left Section: Login Form */}
        <div className="p-8 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-[#1a1a1e]">Welcome back</h1>
            <p className="text-[#62626b] text-lg">
              Step into our shopping metaverse for an unforgettable shopping experience
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#62626b]" />
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="pl-10 py-2 h-12 rounded-lg border border-[#e9ecf2] focus:border-[#9414ff] focus:ring-1 focus:ring-[#9414ff] text-[#1a1a1e]"
              />
              <Label htmlFor="email" className="sr-only">
                Email
              </Label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#62626b]" />
              <Input
                id="password"
                type="password"
                placeholder="Password"
                className="pl-10 py-2 h-12 rounded-lg border border-[#e9ecf2] focus:border-[#9414ff] focus:ring-1 focus:ring-[#9414ff] text-[#1a1a1e]"
              />
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
            </div>
            <Button className="w-full h-12 bg-[#9414ff] hover:bg-[#9414ff]/90 text-white text-lg font-semibold rounded-lg">
              Login
            </Button>
          </div>
          <div className="mt-6 text-center text-sm text-[#62626b]">
            Don&apos;t have an account?{" "}
            <Link href="#" className="font-medium hover:underline text-[#9414ff]">
              Sign up
            </Link>
          </div>
        </div>

        {/* Right Section: Image and Logo */}
        <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-[#b0d2e5] to-[#e477f6] p-8">
          <Image
            src="/placeholder.svg?height=400&width=400"
            alt="Abstract 3D art"
            width={400}
            height={400}
            className="object-contain max-w-full max-h-full"
          />
          <div className="absolute bottom-8 right-8 text-4xl font-extrabold text-[#1a1a1e] tracking-tight">
            meetus<span className="text-xl align-super">VR</span>
          </div>
        </div>
      </div>
    </div>
  )
}
