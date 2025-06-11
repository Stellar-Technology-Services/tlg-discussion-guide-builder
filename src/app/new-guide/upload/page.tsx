"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileUp, ArrowLeft } from "lucide-react"

export default function UploadDocumentsPage() {
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving">("saved")
  const [files, setFiles] = useState([
    { type: "RFP", name: "Client_RFP_2023.pdf" },
    { type: "Proposal", name: "Project_Proposal_v2.pptx" },
  ])

  // Simulate auto-save when files change
  useEffect(() => {
    setAutoSaveStatus("saving")
    const timer = setTimeout(() => {
      setAutoSaveStatus("saved")
    }, 1000)
    return () => clearTimeout(timer)
  }, [files])

  const removeFile = (fileName: string) => {
    setFiles(files.filter((file) => file.name !== fileName))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <div className="flex items-center gap-2">
                <img
                  src="/images/tlg-logo-large.svg"
                  alt="The Link Group Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
                <span className="text-xl font-bold">| Guide Builder</span>
              </div>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div
                className={`w-2 h-2 rounded-full ${autoSaveStatus === "saved" ? "bg-green-500" : "bg-yellow-500"}`}
              />
              <span>{autoSaveStatus === "saved" ? "Saved" : "Auto-saving..."}</span>
            </div>
            <Link href="/new-guide/context">
              <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">Continue to Project Context</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Step 1: Upload Project Documents</h2>

          <Card>
            <CardHeader>
              <CardTitle>Upload Project Documents</CardTitle>
              <CardDescription>Provide context by uploading relevant project files</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="border border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50">
                  <FileUp className="h-8 w-8 mx-auto text-[#00A7E1] mb-2" />
                  <p className="text-sm text-muted-foreground mb-1">Drag & drop files or click to browse</p>
                  <p className="text-xs text-muted-foreground">Supports PDF, PPTX, DOCX (Max 10MB)</p>
                </div>

                <div className="space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between rounded-md border p-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{file.type}</Badge>
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFile(file.name)}>
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link href="/new-guide/context">
                <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">Continue to Project Context</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
