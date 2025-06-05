"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Star,
  StarHalf,
  Info,
  Check,
  Lightbulb,
  Sparkles,
  Users,
  Tag,
  FileQuestion,
  Building,
  ChevronDown,
  ChevronUp,
  FilePenLine,
  Loader2,
  Eye,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for guides (assuming it's the same as before)
const mockGuides = [
  {
    id: 1,
    title: "Oncology Patient Journey",
    client: "PharmaCorp Inc.",
    date: "Mar 2023",
    topic: "Patient Journey",
    target: "Oncology Patients",
    relevance: 98,
    matchReasons: [
      { type: "topic", text: "Oncology research focus matches your project context" },
      { type: "objective", text: "Patient journey mapping aligns with your research objectives" },
      { type: "audience", text: "Target audience (patients) matches your research target" },
    ],
    sections: [
      {
        title: "Introduction & Warm-up",
        preview: `<p><strong>Introduction & Warm-up (5 minutes)</strong></p><p>Thank you for joining us today. My name is [Moderator Name] and I’ll be leading our discussion. We’re conducting research to better understand the experiences of patients with [cancer type]. Your insights will help improve support and resources for patients. Our conversation will last about 60 minutes. There are no right or wrong answers – we’re interested in your personal experiences and opinions. This session is being recorded for research purposes only. Your identity will remain confidential in any reporting. Do you have any questions before we begin?</p>`,
      },
      {
        title: "Background & Diagnosis",
        preview: `<p><strong>Background & Diagnosis (10 minutes)</strong></p><p>1. Could you tell me a little about yourself and your journey leading up to your diagnosis with [cancer type]? (Probe: When were you diagnosed? How did you find out? What were your initial thoughts/feelings?)</p><p>2. What was your understanding of [cancer type] before your diagnosis? (Probe: Where did you get information? Any misconceptions?)</p>`,
      },
      {
        title: "Treatment Decision Journey",
        preview: `<p><strong>Treatment Decision Journey (15 minutes)</strong></p><p>1. Think back to when you were discussing treatment options with your healthcare team. What were the most important factors for you when deciding on a treatment plan? (Probe: Efficacy, side effects, impact on daily life, doctor’s recommendation, insurance coverage, etc.)</p><p>2. How involved did you feel in the decision-making process? (Probe: Did you feel your preferences were heard? Did you have enough information?)</p><p>3. What resources or support systems did you find most helpful during this time? (Probe: Family, friends, patient advocacy groups, online forums, specific hospital programs)</p>`,
      },
      {
        title: "Support Needs & Resources",
        preview: `<p><strong>Support Needs & Resources (15 minutes)</strong></p><p>1. What types of support (emotional, practical, informational) have been most important to you throughout your cancer journey? (Probe: Where did you find this support? Any gaps?)</p><p>2. Are you aware of any patient support programs or resources offered by [PharmaCorp Inc. or other organizations]? (Probe: If yes, what has been your experience? If no, what would be most helpful?)</p><p>3. If you could design the perfect support system for patients with [cancer type], what would it include?</p>`,
      },
      {
        title: "Conclusion",
        preview: `<p><strong>Conclusion (5 minutes)</strong></p><p>1. Based on your experience, what is one piece of advice you would give to a newly diagnosed patient with [cancer type]?</p><p>2. Is there anything else you’d like to share about your experience or journey that we haven’t discussed?</p><p>Thank you for your time and valuable insights.</p>`,
      },
    ],
  },
  {
    id: 2,
    title: "Diabetes Treatment Satisfaction",
    client: "MediHealth",
    date: "Jan 2023",
    topic: "Treatment Satisfaction",
    target: "Diabetes Patients",
    relevance: 82,
    matchReasons: [
      { type: "objective", text: "Patient experience focus aligns with your research objectives" },
      { type: "methodology", text: "Qualitative interview approach matches your methodology" },
    ],
    sections: [
      { title: "Introduction", preview: "<p>Intro to diabetes treatment satisfaction study...</p>" },
      { title: "Treatment Experience", preview: "<p>Discussing current treatment and satisfaction levels...</p>" },
    ],
  },
  {
    id: 3,
    title: "HCP Prescribing Behavior",
    client: "BioScience Ltd.",
    date: "Nov 2022",
    topic: "Prescribing Behavior",
    target: "Healthcare Providers",
    relevance: 65,
    matchReasons: [
      { type: "industry", text: "Healthcare industry focus matches your project context" },
      { type: "methodology", text: "In-depth interview approach matches your methodology" },
    ],
    sections: [
      { title: "Introduction", preview: "<p>Intro for HCPs...</p>" },
      { title: "Prescribing Factors", preview: "<p>Factors influencing prescribing decisions...</p>" },
    ],
  },
  {
    id: 4,
    title: "Rare Disease Patient Support Needs",
    client: "RareCare",
    date: "Oct 2022",
    topic: "Patient Support",
    target: "Rare Disease Patients & Caregivers",
    relevance: 78,
    matchReasons: [
      { type: "objective", text: "Support needs focus aligns with your research objectives" },
      { type: "audience", text: "Patient focus matches your research target" },
    ],
    sections: [
      { title: "Introduction", preview: "<p>Understanding support needs in rare diseases...</p>" },
      { title: "Diagnosis Journey", preview: "<p>Challenges in the rare disease diagnosis journey...</p>" },
    ],
  },
  {
    id: 5,
    title: "Oncology Treatment Decision Making",
    client: "CancerCare Alliance",
    date: "Aug 2022",
    topic: "Decision Making",
    target: "Oncology Patients",
    relevance: 90,
    matchReasons: [
      { type: "topic", text: "Oncology focus matches your project context" },
      { type: "objective", text: "Decision-making focus aligns with your research objectives" },
      { type: "audience", text: "Target audience (patients) matches your research target" },
    ],
    sections: [
      { title: "Introduction", preview: "<p>Focus on oncology treatment decisions...</p>" },
      { title: "Diagnosis Experience", preview: "<p>Patient experiences during diagnosis...</p>" },
    ],
  },
  {
    id: 6, // New ID for search results
    title: "Cardiovascular Health Patient Insights",
    client: "HeartWell Solutions",
    date: "Apr 2024",
    topic: "Patient Insights",
    target: "Cardiology Patients",
    relevance: 70,
    matchReasons: [
      { type: "industry", text: "Healthcare focus is relevant" },
      { type: "objective", text: "Gathers patient perspectives, broadly aligning with research goals" },
    ],
    sections: [
      { title: "Introduction", preview: "<p>Understanding cardiovascular health...</p>" },
      { title: "Lifestyle Impact", preview: "<p>Exploring daily habits...</p>" },
      { title: "Medication Adherence", preview: "<p>Challenges and motivators...</p>" },
    ],
  },
  {
    id: 7, // New ID for search results
    title: "Mental Wellness in Chronic Illness",
    client: "MindEase Corp.",
    date: "Feb 2024",
    topic: "Mental Wellness",
    target: "Patients with Chronic Conditions",
    relevance: 68,
    matchReasons: [
      { type: "topic", text: "Addresses emotional impact, a part of your objectives" },
      { type: "audience", text: "Focuses on patients, aligning with your target" },
    ],
    sections: [
      { title: "Introduction", preview: "<p>The importance of mental well-being...</p>" },
      { title: "Coping Mechanisms", preview: "<p>Strategies for managing stress...</p>" },
      { title: "Support Systems", preview: "<p>Role of family and community...</p>" },
    ],
  },
]

export default function SearchPastGuidesPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchResultsRef = useRef<HTMLDivElement>(null)

  const [selectedPrimaryGuide, setSelectedPrimaryGuide] = useState(1)
  const [selectedSecondaryGuides, setSelectedSecondaryGuides] = useState<number[]>([2, 4, 5])
  const [showAIExplanations, setShowAIExplanations] = useState(false)
  const [processingGuides, setProcessingGuides] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving">("saved")

  // Filters state
  const [filterResearchTopic, setFilterResearchTopic] = useState("")
  const [filterDetailedType, setFilterDetailedType] = useState("")
  const [filterOverallMethods, setFilterOverallMethods] = useState("")

  const [relayedResearchObjectives, setRelayedResearchObjectives] = useState("")

  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchPerformed, setSearchPerformed] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)

  const [sectionsCollapsed, setSectionsCollapsed] = useState<{ [guideId: number]: boolean }>({})

  useEffect(() => {
    const initialCollapsedState: { [guideId: number]: boolean } = {}
    mockGuides.forEach((guide) => {
      initialCollapsedState[guide.id] = true // Collapse all by default
    })
    aiRecommendedGuides.forEach((guide) => {
      // Ensure AI recommended are also in this state
      initialCollapsedState[guide.id] = true
    })
    setSectionsCollapsed(initialCollapsedState)
  }, [])

  const toggleSectionCollapse = (guideId: number) => {
    setSectionsCollapsed((prev) => ({ ...prev, [guideId]: !prev[guideId] }))
  }

  useEffect(() => {
    const topic = searchParams.get("topic")
    const detailedType = searchParams.get("detailedType")
    const methods = searchParams.get("methods")
    const objectives = searchParams.get("objectives")

    if (topic) setFilterResearchTopic(topic)
    if (detailedType) setFilterDetailedType(detailedType)
    if (methods) setFilterOverallMethods(methods)
    if (objectives) setRelayedResearchObjectives(objectives)
  }, [searchParams])

  useEffect(() => {
    setAutoSaveStatus("saving")
    const timer = setTimeout(() => {
      setAutoSaveStatus("saved")
    }, 1000)
    return () => clearTimeout(timer)
  }, [
    selectedPrimaryGuide,
    selectedSecondaryGuides,
    filterResearchTopic,
    filterDetailedType,
    filterOverallMethods,
    relayedResearchObjectives,
  ])

  useEffect(() => {
    if (processingGuides) {
      const interval = setInterval(() => {
        setProcessingProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            clearInterval(interval)
            // Navigate to outline page when processing is complete
            setTimeout(() => {
              router.push("/new-guide/outline")
            }, 500)
            return 100
          }
          return newProgress
        })
      }, 300)

      return () => clearInterval(interval)
    }
  }, [processingGuides, router])

  const handlePrimaryGuideSelect = (guideId: number) => {
    setSelectedPrimaryGuide(guideId)
    setSelectedSecondaryGuides(selectedSecondaryGuides.filter((id) => id !== guideId))
  }

  const handleSecondaryGuideSelect = (guideId: number) => {
    if (selectedSecondaryGuides.includes(guideId)) {
      setSelectedSecondaryGuides(selectedSecondaryGuides.filter((id) => id !== guideId))
    } else {
      setSelectedSecondaryGuides([...selectedSecondaryGuides, guideId])
    }
  }

  const handleSearch = () => {
    setSearchLoading(true)
    setSearchPerformed(true)
    // Simulate API call
    // For this POC, search results will be the new distinct guides (ID 6 and 7)
    setTimeout(() => {
      const distinctSearchResults = mockGuides.filter((guide) => guide.id === 6 || guide.id === 7)
      setSearchResults(distinctSearchResults)
      setSearchLoading(false)
      // Scroll to the bottom of the page
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 100)
    }, 1500)
  }

  const handleContinue = () => {
    if (selectedPrimaryGuide) {
      setProcessingGuides(true)
    }
  }

  const getRelevanceBadgeColor = (relevance: number) => {
    if (relevance >= 90) return "bg-green-100 text-green-800 border-green-200"
    if (relevance >= 75) return "bg-blue-100 text-blue-800 border-blue-200"
    if (relevance >= 60) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-gray-100 text-gray-800 border-gray-200"
  }

  const getRelevanceIcon = (relevance: number) => {
    if (relevance >= 90) return <Star className="h-4 w-4 text-green-600" />
    if (relevance >= 75) return <Star className="h-4 w-4 text-blue-600" />
    if (relevance >= 60) return <StarHalf className="h-4 w-4 text-yellow-600" />
    return <StarHalf className="h-4 w-4 text-gray-400" />
  }

  const getMatchReasonIcon = (type: string) => {
    switch (type) {
      case "topic":
        return <Tag className="h-4 w-4 text-blue-600" />
      case "objective":
        return <Lightbulb className="h-4 w-4 text-green-600" />
      case "audience":
        return <Users className="h-4 w-4 text-purple-600" />
      case "methodology":
        return <FileQuestion className="h-4 w-4 text-orange-600" />
      case "industry":
        return <Building className="h-4 w-4 text-cyan-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const aiRecommendedGuides = mockGuides.filter((guide) => [1, 2, 4, 5].includes(guide.id))

  const renderGuideCard = (guide: any, isRecommended: boolean) => (
    <Dialog>
      <Card key={guide.id}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <CardTitle className="text-lg">{guide.title}</CardTitle>
                {isRecommended && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Sparkles className="h-4 w-4 text-blue-500" />
                      </TooltipTrigger>
                      <TooltipContent>AI Recommended</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <CardDescription>
                {guide.client} • {guide.date} • {guide.topic} • {guide.target}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">Preview Guide</span>
                </Button>
              </DialogTrigger>
              <Badge variant="outline" className={`flex items-center gap-1 ${getRelevanceBadgeColor(guide.relevance)}`}>
                {getRelevanceIcon(guide.relevance)}
                {guide.relevance}% Relevant
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <Button variant="outline" size="sm" onClick={() => toggleSectionCollapse(guide.id)} className="mb-2 w-full">
            {sectionsCollapsed[guide.id] ? (
              <ChevronDown className="mr-2 h-4 w-4" />
            ) : (
              <ChevronUp className="mr-2 h-4 w-4" />
            )}
            {sectionsCollapsed[guide.id] ? "View Sections" : "Hide Sections"} ({guide.sections.length})
          </Button>

          {!sectionsCollapsed[guide.id] && (
            <div className="mb-3">
              <div className="grid grid-cols-1 gap-2">
                {guide.sections.map((section: any, i: number) => (
                  <div key={i} className="border rounded-md p-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm">{section.title}</span>
                    </div>
                    <div
                      className="text-xs text-muted-foreground prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          section.preview.replace(/<p><strong>.*?<\/strong><\/p>\s*/i, "").split("</p>")[0] + "</p>",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="my-3 space-y-1">
            <p className="text-sm font-medium flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Why this guide matches your project:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {guide.matchReasons.map((reason: any, i: number) => (
                <div
                  key={i}
                  className="flex items-center gap-1 text-sm text-muted-foreground bg-muted/50 rounded-md px-2 py-1"
                >
                  {getMatchReasonIcon(reason.type)}
                  <span>{reason.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Preview button removed from here */}
            <Button
              variant={selectedPrimaryGuide === guide.id ? "default" : "outline"}
              size="sm"
              className={
                selectedPrimaryGuide === guide.id
                  ? "bg-[#00A7E1] hover:bg-[#0089b8]"
                  : selectedPrimaryGuide !== null
                    ? "opacity-50"
                    : ""
              }
              onClick={() => handlePrimaryGuideSelect(guide.id)}
              disabled={selectedPrimaryGuide !== null && selectedPrimaryGuide !== guide.id}
            >
              {selectedPrimaryGuide === guide.id ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Primary Guide
                </>
              ) : (
                "Set as Primary Guide"
              )}
            </Button>
            <Button
              variant={selectedSecondaryGuides.includes(guide.id) ? "default" : "outline"}
              size="sm"
              className={selectedSecondaryGuides.includes(guide.id) ? "bg-green-600 hover:bg-green-700" : ""}
              onClick={() => handleSecondaryGuideSelect(guide.id)}
              disabled={selectedPrimaryGuide === guide.id}
            >
              {selectedSecondaryGuides.includes(guide.id) ? (
                <>
                  <Check className="mr-1 h-4 w-4" /> Secondary Guide
                </>
              ) : (
                "Add as Secondary Guide"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{guide.title}</DialogTitle>
          <DialogDescription>
            {guide.client} • {guide.date} • {guide.topic} • {guide.target}
          </DialogDescription>
        </DialogHeader>
        <div className="prose prose-sm max-w-none py-4">
          {guide.sections.map((section: any, index: number) => (
            <div key={index} dangerouslySetInnerHTML={{ __html: section.preview }} />
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/new-guide/context">
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
            {processingGuides ? (
              <Progress value={processingProgress} className="w-40" />
            ) : (
              selectedPrimaryGuide && (
                <Button className="bg-[#00A7E1] hover:bg-[#0089b8]" onClick={handleContinue}>
                  Generate Outline
                </Button>
              )
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        {processingGuides ? (
          // ... (processing UI remains the same)
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Processing Selected Guides</h2>
            <Progress value={processingProgress} className="w-full" />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Step 3: Find Reference Guides</h2>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center gap-1 text-sm">
                        <Switch
                          checked={showAIExplanations}
                          onCheckedChange={setShowAIExplanations}
                          id="ai-explanations"
                        />
                        <Label htmlFor="ai-explanations">Show AI Helper Text</Label>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Toggle AI explanations and tips</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 space-y-4">
                {/* Selection Summary Card */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Selection Summary</CardTitle>
                    <CardDescription>Your selected guides</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Primary Guide (Structure)</p>
                      {selectedPrimaryGuide ? (
                        <div className="mt-1 border rounded-md p-2 bg-blue-50">
                          <p className="text-sm font-medium">
                            {mockGuides.find((g) => g.id === selectedPrimaryGuide)?.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {mockGuides.find((g) => g.id === selectedPrimaryGuide)?.client} •{" "}
                            {mockGuides.find((g) => g.id === selectedPrimaryGuide)?.date}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No primary guide selected</p>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Secondary Guides (Content)</p>
                        <Badge variant="outline">{selectedSecondaryGuides.length}</Badge>
                      </div>
                      {selectedSecondaryGuides.length > 0 ? (
                        <div className="mt-1 space-y-2">
                          {selectedSecondaryGuides.map((guideId) => {
                            const guide = mockGuides.find((g) => g.id === guideId)
                            return (
                              <div key={guideId} className="border rounded-md p-2">
                                <p className="text-sm">{guide?.title}</p>
                              </div>
                            )
                          })}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">No secondary guides selected</p>
                      )}
                    </div>
                    {(selectedPrimaryGuide || selectedSecondaryGuides.length > 0) && (
                      <Button
                        className="w-full mt-2 bg-[#00A7E1] hover:bg-[#0089b8]"
                        onClick={handleContinue}
                        disabled={!selectedPrimaryGuide}
                      >
                        Generate Outline
                      </Button>
                    )}
                  </CardContent>
                </Card>
                {showAIExplanations && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex gap-3">
                        <div className="mt-1">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">How to use this page</p>
                          <ul className="text-xs text-blue-700 mt-1 space-y-1 list-disc pl-5">
                            <li>
                              Select <strong>one primary guide</strong> for overall structure.
                            </li>
                            <li>
                              Add <strong>secondary guides</strong> for content inspiration. All sections from secondary
                              guides will be considered.
                            </li>
                            <li>Use filters and refine objectives to narrow down choices.</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="lg:col-span-3 space-y-4">
                {showAIExplanations && (
                  <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-4">
                      <div className="flex gap-3">
                        <div className="mt-1">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-blue-800">AI-Powered Guide Recommendations</p>
                          <p className="text-sm text-blue-700 mt-1">
                            Based on your project context from Step 2, we've pre-selected guides that closely match your
                            needs.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 items-end">
                  <div className="lg:col-span-1 space-y-1">
                    <Label htmlFor="filter-research-topic" className="text-xs">
                      Research Topic
                    </Label>
                    <Select value={filterResearchTopic} onValueChange={setFilterResearchTopic}>
                      <SelectTrigger id="filter-research-topic">
                        <SelectValue placeholder="Select Topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="journeys">Journeys</SelectItem>
                        <SelectItem value="concept">Concept</SelectItem>
                        <SelectItem value="usage">Usage, Attitude & Awareness</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-1 space-y-1">
                    <Label htmlFor="filter-detailed-type" className="text-xs">
                      Detailed Customer Type
                    </Label>
                    <Select value={filterDetailedType} onValueChange={setFilterDetailedType}>
                      <SelectTrigger id="filter-detailed-type">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oncology">Oncology</SelectItem>
                        <SelectItem value="diabetes">Diabetes</SelectItem>
                        <SelectItem value="chronic-pain">Chronic Pain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-1 space-y-1">
                    <Label htmlFor="filter-overall-methods" className="text-xs">
                      Overall Methods
                    </Label>
                    <Select value={filterOverallMethods} onValueChange={setFilterOverallMethods}>
                      <SelectTrigger id="filter-overall-methods">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="qualitative">Qualitative</SelectItem>
                        <SelectItem value="quantitative">Quantitative</SelectItem>
                        <SelectItem value="ethnography">Onsite / Ethnography</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="lg:col-span-1 flex items-end">
                    <Popover>
                      <TooltipProvider>
                        {" "}
                        {/* Provider can be higher up in your app if used globally */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-9 w-9"
                                aria-label="Refine by Research Objectives"
                              >
                                <FilePenLine className="h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Refine by Research Objectives</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <PopoverContent className="w-96 z-50">
                        {" "}
                        {/* Added z-index for good measure */}
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <h4 className="font-medium leading-none">Refine Research Objectives</h4>
                            <p className="text-sm text-muted-foreground">Edit objectives to narrow search.</p>
                          </div>
                          <Textarea
                            id="relayed-objectives-popover"
                            value={relayedResearchObjectives}
                            onChange={(e) => setRelayedResearchObjectives(e.target.value)}
                            placeholder="Edit research objectives to refine search..."
                            className="min-h-[100px]"
                          />
                          {/* You might want a button here to apply/close the popover, or it can close on blur */}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="lg:col-span-1">
                    <Button onClick={handleSearch} disabled={searchLoading} className="w-full">
                      {searchLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      {searchLoading ? "Searching..." : "Search"}
                    </Button>
                  </div>
                </div>

                <div ref={searchResultsRef} className="space-y-4 pt-2">
                  <p className="text-sm font-semibold">AI Recommended Guides ({aiRecommendedGuides.length})</p>
                  {aiRecommendedGuides.map((guide) => renderGuideCard(guide, true))}

                  {searchPerformed && searchResults.length > 0 && (
                    <>
                      <div className="border-t pt-4 mt-6">
                        <p className="text-sm font-semibold">Search Results ({searchResults.length})</p>
                      </div>
                      {searchResults.map((guide) => renderGuideCard(guide, false))}
                    </>
                  )}
                  {searchPerformed && searchResults.length === 0 && (
                    <Card className="mt-4">
                      <CardContent className="pt-6 text-center">
                        <p className="text-muted-foreground">
                          No additional guides found matching your refined search criteria.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
