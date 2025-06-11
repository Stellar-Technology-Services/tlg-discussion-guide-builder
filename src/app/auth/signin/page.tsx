"use client"

// Import NextAuth functions for authentication and session management
import { signIn, getSession } from "next-auth/react"
// Import Next.js navigation hook for programmatic routing
import { useRouter } from "next/navigation"
// Import React hooks for component lifecycle management
import { useEffect } from "react"
// Import UI components for consistent styling
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// Import icons for visual enhancement
import { LogIn } from "lucide-react"
// Import Next.js components for optimized image and link handling
import Image from "next/image"
import Link from "next/link"

export default function SignIn() {
  // Get router instance for programmatic navigation
  const router = useRouter()

  // Effect to redirect authenticated users away from sign-in page
  useEffect(() => {
    // Check if user is already signed in
    getSession().then((session) => {
      if (session) {
        // If authenticated, redirect to home page to avoid confusion
        router.push('/')
      }
    })
  }, [router]) // Dependency array ensures effect runs when router changes

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header with company branding - matches main app layout */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center py-4">
          <Link href="/">
            <div className="flex items-center gap-2">
              {/* Company logo with optimized loading */}
              <img
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
      
      {/* Main content area with centered sign-in form */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          {/* Card header with welcoming title and description */}
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue building discussion guides
            </CardDescription>
          </CardHeader>
          
          {/* Card content with sign-in button and legal notice */}
          <CardContent className="space-y-4">
            {/* Primary sign-in button with Azure AD provider */}
            <Button
              onClick={() => signIn("azure-ad", { callbackUrl: "/" })}
              className="w-full bg-[#00A7E1] hover:bg-[#0089b8] flex items-center justify-center gap-2"
              size="lg"
            >
              <LogIn className="h-5 w-5" />
              Sign in with Microsoft
            </Button>
            
            {/* Legal notice for compliance */}
            <p className="text-xs text-muted-foreground text-center">
              By signing in, you agree to our terms of service and privacy policy.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
} 