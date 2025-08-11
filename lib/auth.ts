"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const TOKEN_COOKIE_NAME = "auth_token"
const API_BASE_URL = "https://api-yeshtery.dev.meetusvr.com/v1"

// Server Action for Login
export async function loginUser(prevState: { message: string | null }, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  if (!email || !password) {
    return { message: "Email and password are required." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { message: "Please enter a valid email address." }
  }

  let token: string | null = null
  let userInfo: { id: string; name: string } | null = null

  try {
    // Step 1: Call login API
    const loginResponse = await fetch(`${API_BASE_URL}/yeshtery/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, isEmployee: true }),
    })

    if (!loginResponse.ok) {
      const errorData = await loginResponse.json()
      return { message: errorData.message || "Login failed. Please check your credentials." }
    }

    const loginData = await loginResponse.json()
    token = loginData.token

    if (!token) {
      return { message: "Login failed: No token received." }
    }

    // Store token in HTTP-only cookie
    cookies().set(TOKEN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    // Step 2: Call user info API
    const userInfoResponse = await fetch(`${API_BASE_URL}/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!userInfoResponse.ok) {
      // If user info fails, clear token and return error
      cookies().delete(TOKEN_COOKIE_NAME)
      const errorData = await userInfoResponse.json()
      return { message: errorData.message || "Failed to retrieve user information after login." }
    }

    const userData = await userInfoResponse.json()
    userInfo = { id: userData.id, name: userData.name }
  } catch (error) {
    console.error("Authentication process error:", error)
    return { message: "An unexpected error occurred during authentication." }
  }

  // Redirect only after successful token storage and user info retrieval
  redirect("/dashboard")
}

// Server Function to get user info (used by server components)
export async function getUserInfo() {
  const token = cookies().get(TOKEN_COOKIE_NAME)?.value

  if (!token) {
    return null // Not authenticated
  }

  try {
    const response = await fetch(`${API_BASE_URL}/user/info`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      // If token is invalid or expired (e.g., HTTP 401), clear the cookie
      cookies().delete(TOKEN_COOKIE_NAME)
      return null
    }

    const data = await response.json()
    return { id: data.id, name: data.name }
  } catch (error) {
    console.error("User info API error:", error)
    cookies().delete(TOKEN_COOKIE_NAME) // Clear cookie on network/other errors
    return null
  }
}

// Server Action for Logout
export async function logoutUser() {
  cookies().delete(TOKEN_COOKIE_NAME)
  redirect("/login")
}
