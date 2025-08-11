import { getUserInfo, logoutUser } from "@/lib/auth"
import { DashboardClient } from "@/components/dashboardClient"

export default async function DashboardPage() {
  const userInfo = await getUserInfo()

  if (!userInfo) {
    // If not authenticated, clear any lingering cookies and redirect to login
    await logoutUser() // This will clear the cookie and redirect
  }

  // Pass initial user info to the client component for Zustand hydration
  return <DashboardClient initialUserId={userInfo?.id || null} initialUserName={userInfo?.name || null} />
}
