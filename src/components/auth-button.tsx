"use client"

// Import NextAuth hooks for session management and authentication actions
import { useSession, signIn, signOut } from "next-auth/react"
// Import UI components for consistent styling
import { Button } from "@/components/ui/button"
// Import icons for visual clarity
import { LogIn, LogOut, User, Loader2 } from "lucide-react"

export default function AuthButton() {
  // Get current session state - data contains user info, status tracks loading state
  const { data: session, status } = useSession()

  // Show loading spinner while session is being fetched
  if (status === "loading") {
    return (
      <Button variant="outline" disabled className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading...
      </Button>
    )
  }

  // If user is authenticated, show welcome message and sign out button
  if (session) {
    return (
      <div className="flex items-center gap-3">
        {/* User greeting with fallback display name */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <User className="h-4 w-4" />
          <span>Welcome, {session.user?.name || session.user?.email || 'User'}</span>
        </div>
        
        {/* Sign out button with confirmation through NextAuth */}
        <Button
          variant="outline"
          onClick={() => signOut({ callbackUrl: '/' })}
          className="flex items-center gap-2"
          size="sm"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </Button>
      </div>
    )
  }

  // If user is not authenticated, show sign in button
  return (
    <Button
      onClick={() => signIn("azure-ad")}
      className="bg-[#00A7E1] hover:bg-[#0089b8] flex items-center gap-2"
      size="sm"
    >
      <LogIn className="h-4 w-4" />
      Sign In
    </Button>
  )
} 