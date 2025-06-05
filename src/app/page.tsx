"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

export default function Home() {
  return (

    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TLGLogo-tQcs9nfk15k8ksX7MOj3NlZ7JGLU4o.svg"
                  alt="The Link Group Logo"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
                />
                <h1 className="text-xl font-bold">Discussion Guide Builder</h1>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/new-guide/upload">
              <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Guide
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="container py-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold tracking-tight">Welcome back, Researcher</h2>
            </div>

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
          </div>
        </section>
      </main>
    </div>
  )
}
