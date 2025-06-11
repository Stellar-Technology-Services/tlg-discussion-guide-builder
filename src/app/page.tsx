"use client"
import Link from "next/link"
import Image from "next/image"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle, LogOut, User } from "lucide-react"
import AuthButton from "@/components/auth-button"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/tlg-logo-large.svg"
                  alt="The Link Group Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
                <h1 className="text-xl font-bold">Discussion Guide Builder</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {session && (
              <>
                <Link href="/new-guide/upload">
                  <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    New Guide
                  </Button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{session.user?.name || session.user?.email || 'User'}</span>
                  </div>
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
              </>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container mx-auto py-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">
                {session 
                  ? `Welcome back, ${session.user?.name || 'Researcher'}` 
                  : 'Welcome to your Discussion Guide Builder'
                }
              </h2>
            </div>

            {session ? (
              <div className="flex justify-center">
                <Card className="max-w-md w-full">
                  <CardHeader className="pb-3">
                    <CardTitle>Quick Start</CardTitle>
                    <CardDescription>Begin a new discussion guide with AI assistance</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <Link href="/new-guide/upload">
                      <Button className="w-full bg-[#00A7E1] hover:bg-[#0089b8]">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Guide
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="flex justify-center pt-2">
                <Card className="max-w-md w-full">
                  <CardHeader className="pt-0">
                    <CardTitle>Get Started</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-6 text-center">
                    <AuthButton />
                    <CardDescription>Start creating discussion guides with AI assistance</CardDescription>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
