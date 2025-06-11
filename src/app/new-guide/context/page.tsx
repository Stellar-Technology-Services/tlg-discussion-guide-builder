"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"

export default function ProjectContextPage() {
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving">("saved")
  const [formData, setFormData] = useState({
    projectTitle: "Oncology Patient Journey Research",
    clientName: "PharmaCorp Inc.",
    companyType: "healthcare",
    detailedType: "oncology",
    researchObjectives: `1. Understand the complete patient journey from initial symptoms to ongoing treatment
2. Identify key decision points and influences in treatment selection
3. Explore unmet needs and support opportunities throughout the cancer care journey
4. Gather insights on the emotional impact of diagnosis and treatment`,
    researchTopic: "journeys",
    overallMethods: "qualitative",
    strategicFramework: "customer-journey",
    qualitativeTechniques: "in-depth",
  })

  // Simulate auto-save when form data changes
  useEffect(() => {
    setAutoSaveStatus("saving")
    const timer = setTimeout(() => {
      setAutoSaveStatus("saved")
    }, 1000)
    return () => clearTimeout(timer)
  }, [formData])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/new-guide/upload">
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
            <Link
              href={`/new-guide/search?topic=${encodeURIComponent(formData.researchTopic)}&detailedType=${encodeURIComponent(formData.detailedType)}&methods=${encodeURIComponent(formData.overallMethods)}&objectives=${encodeURIComponent(formData.researchObjectives)}`}
            >
              <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">Continue to Find Guides</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Step 2: Project Context</h2>

          <Card>
            <CardHeader>
              <CardTitle>Project Context</CardTitle>
              <CardDescription>Provide additional details to guide the AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project-title">Project Title</Label>
                  <Input
                    id="project-title"
                    placeholder="Enter project title"
                    value={formData.projectTitle}
                    onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input
                    id="client-name"
                    placeholder="Enter client name"
                    value={formData.clientName}
                    onChange={(e) => handleInputChange("clientName", e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="company-type">Client Company - Customer Type</Label>
                  <Select
                    value={formData.companyType}
                    onValueChange={(value) => handleInputChange("companyType", value)}
                  >
                    <SelectTrigger id="company-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consumer-goods">Consumer Goods</SelectItem>
                      <SelectItem value="financial">Financial</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="petroleum">Petroleum</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="telecommunications">Telecommunications</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="detailed-type">Detailed Customer Type</Label>
                  <Select
                    value={formData.detailedType}
                    onValueChange={(value) => handleInputChange("detailedType", value)}
                  >
                    <SelectTrigger id="healthcare-state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chronic-pain">Chronic Pain</SelectItem>
                      <SelectItem value="neuromuscular">Neuromuscular</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="diabetes">Diabetes</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="research-topic">Research Topic</Label>
                  <Select
                    value={formData.researchTopic}
                    onValueChange={(value) => handleInputChange("researchTopic", value)}
                  >
                    <SelectTrigger id="research-topic">
                      <SelectValue placeholder="Select topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usage">Usage, Attitude and Awareness</SelectItem>
                      <SelectItem value="customer-profiling">Customer Profiling</SelectItem>
                      <SelectItem value="advertising">Advertising/Promotion</SelectItem>
                      <SelectItem value="concept">Concept</SelectItem>
                      <SelectItem value="customer-satisfaction">Customer Satisfaction</SelectItem>
                      <SelectItem value="data-mining">Data Mining/Data Analytics</SelectItem>
                      <SelectItem value="exploratory">Exploratory Insights</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="journeys">Journeys</SelectItem>
                      <SelectItem value="messaging">Messaging</SelectItem>
                      <SelectItem value="naming">Naming/Branding/Logo</SelectItem>
                      <SelectItem value="patient-support">Patient Support</SelectItem>
                      <SelectItem value="pricing">Pricing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="overall-methods">Overall Methods</Label>
                  <Select
                    value={formData.overallMethods}
                    onValueChange={(value) => handleInputChange("overallMethods", value)}
                  >
                    <SelectTrigger id="overall-methods">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="qualitative">Qualitative</SelectItem>
                      <SelectItem value="quantitative">Quantitative</SelectItem>
                      <SelectItem value="lead-opportunity">Lead Opportunity</SelectItem>
                      <SelectItem value="ethnography">Onsite / Ethnography</SelectItem>
                      <SelectItem value="report-synthesis">Report Synthesis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="strategic-framework">Strategic Framework</Label>
                  <Select
                    value={formData.strategicFramework}
                    onValueChange={(value) => handleInputChange("strategicFramework", value)}
                  >
                    <SelectTrigger id="strategic-framework">
                      <SelectValue placeholder="Select framework" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ace">ACE - Activate, Communicate, Engage</SelectItem>
                      <SelectItem value="customer-journey">Customer Journey Mapping</SelectItem>
                      <SelectItem value="jobs-to-be-done">Jobs to be Done</SelectItem>
                      <SelectItem value="persona-development">Persona Development</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualitative-techniques">Qualitative Techniques</Label>
                  <Select
                    value={formData.qualitativeTechniques}
                    onValueChange={(value) => handleInputChange("qualitativeTechniques", value)}
                  >
                    <SelectTrigger id="qualitative-techniques">
                      <SelectValue placeholder="Select technique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="projective">Projective Techniques</SelectItem>
                      <SelectItem value="in-depth">In-Depth Interviews</SelectItem>
                      <SelectItem value="focus-groups">Focus Groups</SelectItem>
                      <SelectItem value="ethnographic">Ethnographic Observation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="research-objectives">Research Objectives</Label>
                <Textarea
                  id="research-objectives"
                  placeholder="Enter the key objectives of this research project"
                  className="min-h-[100px]"
                  value={formData.researchObjectives}
                  onChange={(e) => handleInputChange("researchObjectives", e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href="/new-guide/upload">
                <Button variant="outline">Back to Upload</Button>
              </Link>
              <Link
                href={`/new-guide/search?topic=${encodeURIComponent(formData.researchTopic)}&detailedType=${encodeURIComponent(formData.detailedType)}&methods=${encodeURIComponent(formData.overallMethods)}&objectives=${encodeURIComponent(formData.researchObjectives)}`}
              >
                <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">Continue to Find Guides</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
