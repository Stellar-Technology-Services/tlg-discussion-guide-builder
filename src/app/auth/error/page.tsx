"use client"

// Import Next.js hook for accessing URL search parameters
import { useSearchParams } from "next/navigation"
// Import UI components for consistent styling
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Import icons for visual feedback
import { AlertCircle, Home, RefreshCw } from "lucide-react"
// Import Next.js components for optimized navigation and images
import Link from "next/link"
import Image from "next/image"

// Define error messages for different authentication error types
const errorMessages = {
  Configuration: "There is a problem with the server configuration. Please contact support.",
  AccessDenied: "You do not have permission to sign in. Please contact your administrator.",
  Verification: "The sign in link is no longer valid. Please try signing in again.",
  Default: "An unexpected error occurred during sign in. Please try again."
} as const

export default function AuthError() {
  // Get search parameters from the URL to identify the specific error
  const searchParams = useSearchParams()
  // Extract the error type from the URL parameters
  const error = searchParams.get("error") as keyof typeof errorMessages

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with company branding - consistent with other auth pages */}
      <header className="border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto flex h-16 items-center py-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              {/* Company logo with optimized loading */}
              <Image
                src="/images/tlg-logo-large.svg"
                alt="The Link Group Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
              {/* App title for context */}
              <h1 className="text-xl font-bold">Discussion Guide Builder</h1>
            </div>
          </Link>
        </div>
      </header>
      
      {/* Main content area with centered error message */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          {/* Card header with error icon and title */}
          <CardHeader className="text-center space-y-4">
            {/* Error icon for visual feedback */}
            <div className="flex justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
            </div>
            
            {/* Error title and description */}
            <div className="space-y-2">
              <CardTitle className="text-2xl font-bold">Authentication Error</CardTitle>
              <CardDescription>
                {/* Display specific error message or default message */}
                {errorMessages[error] || errorMessages.Default}
              </CardDescription>
            </div>
          </CardHeader>
          
          {/* Card content with action buttons */}
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              {/* Help text for user guidance */}
              <p className="text-sm text-muted-foreground">
                If the problem persists, please contact your system administrator.
              </p>
              
              {/* Action buttons for user recovery */}
              <div className="flex flex-col gap-2">
                {/* Primary action: retry authentication */}
                <Link href="/auth/signin" className="w-full">
                  <Button className="w-full bg-[#00A7E1] hover:bg-[#0089b8] flex items-center justify-center gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                  </Button>
                </Link>
                
                {/* Secondary action: return to home page */}
                <Link href="/" className="w-full">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Home className="h-4 w-4" />
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 