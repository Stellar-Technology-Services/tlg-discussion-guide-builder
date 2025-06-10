"use client"

// Import NextAuth session hook
import { useSession } from "next-auth/react"

// Return type interface for better type safety
interface UseAuthReturn {
  user: any | undefined
  isLoading: boolean
  isAuthenticated: boolean
  session: any | null
}

/**
 * Custom hook that provides a clean interface for authentication state
 * Wraps NextAuth's useSession with additional computed properties
 * @returns Object containing user data, loading state, and authentication status
 */
export function useAuth(): UseAuthReturn {
  // Get session data and status from NextAuth
  const { data: session, status } = useSession()

  // Return computed authentication state
  return {
    // User object containing profile information
    user: session?.user,
    // True while session is being fetched from the server
    isLoading: status === "loading",
    // True when user has a valid session
    isAuthenticated: !!session,
    // Complete session object for advanced use cases
    session,
  }
} 