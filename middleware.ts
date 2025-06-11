// Import NextAuth middleware wrapper for route protection
import { withAuth } from "next-auth/middleware"

// Export the middleware with authentication logic
export default withAuth(
  // This function runs for every matched request
  function middleware(req) {
    // Additional logic can be added here if needed
    // For now, we rely on the authorized callback for protection
  },
  {
    callbacks: {
      // This function determines if a user can access a protected route
      authorized: ({ token, req }) => {
        // Define which paths require authentication
        const protectedPaths = ['/new-guide', '/search']
        
        // Check if the current request path starts with any protected path
        const isProtectedPath = protectedPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        )
        
        // If accessing a protected path, require a valid token
        if (isProtectedPath) {
          return !!token // Returns true if token exists, false otherwise
        }
        
        // Allow access to non-protected paths regardless of auth status
        return true
      },
    },
  }
)

// Configure which routes this middleware should run on
// Only check routes that actually need protection to improve performance
export const config = {
  matcher: [
    '/new-guide/:path*',  // Protect all new-guide routes and sub-routes
    '/search/:path*'      // Protect all search routes and sub-routes
  ]
} 