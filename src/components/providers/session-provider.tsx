"use client"

// Import NextAuth session provider for client-side session management
import { SessionProvider } from "next-auth/react"

// Props interface for type safety
interface AuthProviderProps {
  children: React.ReactNode
}

// Wrapper component to provide authentication context throughout the app
export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    // SessionProvider makes session data available to all child components
    // No session prop needed - it will fetch from the API route automatically
    <SessionProvider>
      {children}
    </SessionProvider>
  )
} 