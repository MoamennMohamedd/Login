"use client"

import { Button } from "@/components/ui/button"
import { logoutUser } from "@/lib/auth"
import { useAuthStore } from "@/store/auth-store"
import { useEffect } from "react"

interface DashboardClientProps {
  initialUserId: string | null
  initialUserName: string | null
}

export function DashboardClient({ initialUserId, initialUserName }: DashboardClientProps) {
  const { userId, userName, setAuthInfo, clearAuthInfo } = useAuthStore()

  // Hydrate the store with initial server-fetched data
  useEffect(() => {
    if (initialUserId && initialUserName) {
      setAuthInfo(initialUserId, initialUserName)
    } else {
      clearAuthInfo() // Ensure store is clear if no initial user
    }
  }, [initialUserId, initialUserName, setAuthInfo, clearAuthInfo])

  const handleLogout = async () => {
    await logoutUser() // This server action will clear the cookie and redirect
    clearAuthInfo() // Also clear the Zustand store immediately
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-figma-light-purple to-figma-pink-purple p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 sm:p-10 lg:p-12 text-center space-y-6">
        <h1 className="text-4xl font-bold text-figma-dark-text">Welcome to your Dashboard!</h1>
        {userId && userName ? (
          <>
            <p className="text-lg text-figma-grey-text">
              Hello, <span className="font-semibold text-figma-button-purple">{userName}</span>!
            </p>
            <p className="text-md text-figma-grey-text">
              Your User ID: <span className="font-mono text-figma-dark-text">{userId}</span>
            </p>
          </>
        ) : (
          <p className="text-lg text-figma-grey-text">Loading user information...</p>
        )}
        <form action={handleLogout}>
          <Button
            type="submit"
            className="w-full max-w-xs h-12 bg-figma-button-purple hover:bg-figma-button-purple/90 text-white text-lg font-semibold rounded-lg mt-6"
          >
            Logout
          </Button>
        </form>
      </div>
    </div>
  )
}
