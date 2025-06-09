"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
// Add imports for the AI explanation components
import { Sparkles, ArrowLeft, Plus, Trash2, Clock, ChevronDown, ChevronUp } from "lucide-react"

export default function OutlineConfirmationPage() {
  const [sections, setSections] = useState([
    {
      id: 1,
      title: "Introduction & Warm-up",
      description: "Introduce the research, establish rapport, and set expectations for the discussion.",
      time: 5,
    },
    {
      id: 2,
      title: "Background & Context",
      description: "Gather information about the patient's background and current treatment situation.",
      time: 10,
    },
    {
      id: 3,
      title: "Treatment Decision Journey",
      description:
        "Explore the patient's decision-making process for treatment options, including key influences, information sources, and barriers.",
      time: 15,
    },
    {
      id: 4,
      title: "Support Needs & Resources",
      description:
        "Identify unmet needs and explore what resources would be most valuable throughout the cancer journey.",
      time: 15,
    },
    {
      id: 5,
      title: "Conclusion & Next Steps",
      description:
        "Summarize key points, address any remaining questions, and explain next steps in the research process.",
      time: 5,
    },
  ])

  const [expandedSections, setExpandedSections] = useState<number[]>([])
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving">("saved")
  // Add the AI explanation state
  const [showAIExplanation, setShowAIExplanation] = useState(true)

  useEffect(() => {
    setAutoSaveStatus("saving")
    const timer = setTimeout(() => {
      setAutoSaveStatus("saved")
    }, 1000)
    return () => clearTimeout(timer)
  }, [sections])

  // @ts-expect-error - implicit any for function parameters
  const toggleSection = (id) => {
    if (expandedSections.includes(id)) {
      setExpandedSections(expandedSections.filter((sectionId) => sectionId !== id))
    } else {
      setExpandedSections([...expandedSections, id])
    }
  }

  const addNewSection = () => {
    const newId = Math.max(...sections.map((s) => s.id)) + 1
    const newSection = {
      id: newId,
      title: "New Section",
      description: "Describe the purpose of this section...",
      time: 10,
    }
    setSections([...sections, newSection])
    setExpandedSections([...expandedSections, newId]) // Auto-expand new section
  }

  // @ts-expect-error - implicit any for function parameters
  const removeSection = (id) => {
    setSections(sections.filter((section) => section.id !== id))
    setExpandedSections(expandedSections.filter((sectionId) => sectionId !== id))
  }

  // @ts-expect-error - implicit any for function parameters
  const updateSection = (id, field, value) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
  }

  const totalTime = sections.reduce((sum, section) => sum + section.time, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/new-guide/search">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/">
              <div className="flex items-center gap-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TLGLogo-tQcs9nfk15k8ksX7MOj3NlZ7JGLU4o.svg"
                  alt="The Link Group Logo"
                  width={180}
                  height={40}
                  className="h-8 w-auto"
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
            <Link href="/new-guide/builder">
              <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">Generate Guide</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Suggested Guide Outline</h2>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              Review and customize the suggested outline before proceeding to the guide builder.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAIExplanation(!showAIExplanation)}
              className="flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              {showAIExplanation ? "Hide AI Explanation" : "Show AI Explanation"}
            </Button>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Oncology Patient Journey Research</CardTitle>
                  <CardDescription>PharmaCorp Inc.</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{totalTime} minutes</span>
                  </div>
                  <div className="text-muted-foreground">
                    <span>{sections.length} sections</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`border rounded-md overflow-hidden ${expandedSections.includes(section.id) ? "bg-muted/30" : "hover:bg-muted/10"}`}
                >
                  <div
                    className="flex items-center justify-between p-3 cursor-pointer"
                    onClick={() => toggleSection(section.id)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{section.title}</span>
                          <span className="text-muted-foreground text-sm">({section.time} min)</span>
                        </div>
                        {showAIExplanation && (
                          <div className="text-xs text-blue-600 mt-1">
                            {section.id === 1 &&
                              "Establishes rapport and sets expectations, essential for sensitive health discussions."}
                            {section.id === 2 && "Gathers baseline information about the patient's experience."}
                            {section.id === 3 &&
                              "Directly addresses your objective to identify key decision points and influences."}
                            {section.id === 4 &&
                              "Aligns with your goal to explore unmet needs and support opportunities."}
                            {section.id === 5 &&
                              "Provides closure and captures remaining insights about emotional impact."}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSection(section.id)
                        }}
                        disabled={sections.length <= 1}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {expandedSections.includes(section.id) ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </div>

                  {expandedSections.includes(section.id) && (
                    <div className="p-3 pt-0 border-t">
                      <div className="space-y-3 pt-3">
                        <div className="space-y-1">
                          <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
                          <Input
                            id={`section-title-${section.id}`}
                            value={section.title}
                            onChange={(e) => updateSection(section.id, "title", e.target.value)}
                          />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`section-description-${section.id}`}>Description</Label>
                          <Textarea
                            id={`section-description-${section.id}`}
                            value={section.description}
                            onChange={(e) => updateSection(section.id, "description", e.target.value)}
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Label htmlFor={`section-time-${section.id}`} className="whitespace-nowrap">
                            Estimated Time (minutes):
                          </Label>
                          <Input
                            id={`section-time-${section.id}`}
                            type="number"
                            min="1"
                            max="60"
                            value={section.time}
                            onChange={(e) => updateSection(section.id, "time", Number.parseInt(e.target.value) || 0)}
                            className="w-20"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <Button variant="outline" onClick={addNewSection} className="w-full mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/new-guide/search">
                <Button variant="outline">Back to Find Guide</Button>
              </Link>
              <Link href="/new-guide/builder">
                <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">Generate Guide</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
