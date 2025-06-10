import { NextAuthOptions } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

export const authOptions: NextAuthOptions = {
  // Define authentication providers - only Azure AD for enterprise security
  providers: [
    AzureADProvider({
      // Azure AD application client ID from environment variables
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      // Azure AD application client secret from environment variables  
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      // Azure AD tenant ID to restrict access to specific organization
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    })
  ],
  
  // Configure session and JWT token handling
  callbacks: {
    // JWT callback runs whenever a JWT is created, updated, or accessed
    async jwt({ token, account }) {
      // On initial sign in, persist the OAuth access_token to the JWT
      if (account) {
        token.accessToken = account.access_token
      }
      // Return the token to be encoded in the JWT
      return token
    },
    
    // Session callback runs whenever a session is checked
    async session({ session, token }) {
      // Send access token to the client for API calls if needed
      session.accessToken = token.accessToken
      // Return the session object that will be available on the client
      return session
    },
  },
  
  // Custom page routes for better UX and branding consistency
  pages: {
    signIn: '/auth/signin',    // Custom branded sign-in page
    error: '/auth/error',      // Custom error handling page
  },
  
  // Enable debug mode in development for troubleshooting
  debug: process.env.NODE_ENV === 'development',
} 