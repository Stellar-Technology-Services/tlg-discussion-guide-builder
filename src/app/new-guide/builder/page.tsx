"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Download, Plus, Edit, Check, X, Eye } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RichTextEditor } from "@/components/rich-text-editor"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function GuideBuilderPage() {
  const [progress, setProgress] = useState(100)
  const [generatingSection, setGeneratingSection] = useState(false)
  const [assistingWithAI, setAssistingWithAI] = useState(null)
  const [aiAssistContext, setAiAssistContext] = useState("")
  const [editingSection, setEditingSection] = useState(null)
  const [editedContent, setEditedContent] = useState({})
  const [editedTitles, setEditedTitles] = useState({})
  const [autoSaveStatus, setAutoSaveStatus] = useState<"saved" | "saving">("saved")

  const initialSections = [
    { id: 1, title: "Introduction & Warm-up", generated: true, expanded: true, time: 5 },
    { id: 2, title: "Background & Context", generated: true, expanded: true, time: 10 },
    { id: 3, title: "Treatment Decision Journey", generated: true, expanded: true, time: 15 },
    { id: 4, title: "Support Needs & Resources", generated: true, expanded: true, time: 15 },
    { id: 5, title: "Conclusion & Next Steps", generated: true, expanded: true, time: 5 },
  ]

  const [sections, setSections] = useState(initialSections)

  const initialSectionContent = {
    1: `<p><strong>Moderator introduction:</strong> Thank you for joining us today. My name is [Moderator Name] and I'll be leading our discussion.</p>
<p><strong>Purpose:</strong> We're conducting research to better understand the experiences of patients with [cancer type]. Your insights will help improve support and resources for patients.</p>
<p><strong>Logistics:</strong> Our conversation will last about 60 minutes. There are no right or wrong answers – we're interested in your personal experiences and opinions.</p>
<p><strong>Confidentiality:</strong> This session is being recorded for research purposes only. Your identity will remain confidential in any reporting.</p>
<p><strong>Questions?</strong> Do you have any questions before we begin?</p>`,
    2: `<p><em>Let's start by getting to know a bit about you.</em></p>
<p>1. Could you tell me a little about yourself? (e.g., family, work, hobbies)</p>
<p>2. How long have you been diagnosed with [cancer type]?<br>
   <strong>Probe:</strong> What stage were you at diagnosis?</p>
<p>3. Could you briefly describe your current treatment situation?<br>
   <strong>Probe:</strong> What treatments have you received so far?<br>
   <strong>Probe:</strong> How would you describe your experience with these treatments?</p>`,
    3: `<p><em>Now I'd like to understand more about how you made decisions about your treatment.</em></p>
<p>1. Think back to when you were first diagnosed. How were treatment options presented to you?<br>
   <strong>Probe:</strong> Who presented these options?<br>
   <strong>Probe:</strong> How clear was the information you received?</p>
<p>2. What factors were most important to you when deciding on a treatment plan?<br>
   <strong>Probe:</strong> How did you prioritize effectiveness vs. side effects vs. quality of life?<br>
   <strong>Probe:</strong> Did financial or logistical considerations play a role?</p>
<p>3. Who or what influenced your treatment decisions the most?<br>
   <strong>Probe:</strong> Healthcare providers, family members, other patients?<br>
   <strong>Probe:</strong> Did you seek information online or from support groups?</p>
<p>4. What challenges did you face when making treatment decisions?<br>
   <strong>Probe:</strong> Was there information you wish you had but couldn't find?<br>
   <strong>Probe:</strong> How confident did you feel in your decisions?</p>
<p>5. Looking back, is there anything you would have done differently in your treatment decision process?</p>`,
    4: `<p><em>Let's talk about the support and resources that have been helpful during your cancer journey.</em></p>
<p>1. What types of support have been most valuable to you throughout your cancer journey?<br>
   <strong>Probe:</strong> Medical support, emotional support, practical support?<br>
   <strong>Probe:</strong> From healthcare providers, family/friends, support groups?</p>
<p>2. What information resources have you found most helpful?<br>
   <strong>Probe:</strong> Websites, brochures, videos, patient navigators?<br>
   <strong>Probe:</strong> How did you find these resources?</p>
<p>3. Were there times when you felt you needed more support or information?<br>
   <strong>Probe:</strong> At diagnosis, during treatment decisions, managing side effects?<br>
   <strong>Probe:</strong> What specific support was missing?</p>
<p>4. What barriers have you faced in accessing support or resources?<br>
   <strong>Probe:</strong> Awareness, accessibility, cost, time?</p>
<p>5. If you could design an ideal support program for cancer patients, what would it include?</p>`,
    5: `<p><em>We're coming to the end of our discussion. I'd like to ask a few final questions.</em></p>
<p>1. Based on your experience, what one thing would make the biggest difference in improving the cancer care journey?</p>
<p>2. Is there anything we haven't discussed that you think is important for us to know?</p>
<p><strong>Closing:</strong> Thank you so much for sharing your experiences and insights with us today. Your feedback will help PharmaCorp develop better support resources for patients.</p>
<p><strong>Next steps:</strong> We'll be analyzing the findings from all our interviews and using them to inform new patient support initiatives. Would you be interested in participating in future research?</p>`,
  }
  const [sectionContent, setSectionContent] = useState(initialSectionContent)

  const getSectionDisplayTitle = (sectionId, time) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return "SECTION TITLE"
    return `${section.title.toUpperCase()} (${time} MINUTES)`
  }

  const handleGenerateSection = (sectionId) => {
    setGeneratingSection(true)
    // Simulate generation process
    setTimeout(() => {
      setGeneratingSection(false)
      setSections(sections.map((section) => (section.id === sectionId ? { ...section, expanded: true } : section)))
    }, 2000)
  }

  const handleAIAssist = (sectionId) => {
    if (assistingWithAI === sectionId) {
      // If already showing input for this section, proceed with adding probes
      setGeneratingSection(true)
      // Simulate adding probes with the provided context
      setTimeout(() => {
        setGeneratingSection(false)
        setAssistingWithAI(null)
        setAiAssistContext("")

        // Simulate adding AI enhancement (simulated)
        const updatedContent =
          sectionContent[sectionId] +
          `<p class="text-blue-600"><em>AI Enhancement based on: "${aiAssistContext || "general request"}" (Content would be modified here)</em></p>`
        setSectionContent({
          ...sectionContent,
          [sectionId]: updatedContent,
        })
      }, 2000)
    } else {
      // Show input for adding probes
      setAssistingWithAI(sectionId)
    }
  }

  const startEditing = (sectionId) => {
    const section = sections.find((s) => s.id === sectionId)
    if (!section) return

    setEditingSection(sectionId)
    setEditedContent({
      ...editedContent,
      [sectionId]: sectionContent[sectionId],
    })
    setEditedTitles({
      ...editedTitles,
      [sectionId]: getSectionDisplayTitle(sectionId, section.time),
    })
  }

  const saveEdits = (sectionId) => {
    const newTitle =
      editedTitles[sectionId] || getSectionDisplayTitle(sectionId, sections.find((s) => s.id === sectionId)?.time || 0)
    // Basic parsing of "TITLE (X MINUTES)"
    const titleParts = newTitle.match(/^(.*)\s$$(\d+)\sMINUTES$$$/i)
    let baseTitle = sections.find((s) => s.id === sectionId)?.title || "New Section"
    let time = sections.find((s) => s.id === sectionId)?.time || 0

    if (titleParts && titleParts.length === 3) {
      baseTitle = titleParts[1].trim()
      time = Number.parseInt(titleParts[2], 10)
    } else {
      // If parsing fails, try to use the existing title or a default
      baseTitle = newTitle.replace(/\s$$\d+\sMINUTES$$$/i, "").trim()
    }

    setSections(sections.map((s) => (s.id === sectionId ? { ...s, title: baseTitle, time: time } : s)))

    setSectionContent({
      ...sectionContent,
      [sectionId]: editedContent[sectionId],
    })
    setEditingSection(null)
  }

  const cancelEdits = () => {
    setEditingSection(null)
  }

  const handleEditChange = (sectionId, value) => {
    setEditedContent({
      ...editedContent,
      [sectionId]: value,
    })
  }

  const handleTitleChange = (sectionId, value) => {
    setEditedTitles({
      ...editedTitles,
      [sectionId]: value,
    })
  }

  const addNewSection = () => {
    const newId = Math.max(0, ...sections.map((s) => s.id)) + 1
    const newSectionData = {
      id: newId,
      title: "New Section",
      generated: false,
      expanded: true,
      time: 10,
    }
    setSections([...sections, newSectionData])
    setSectionContent({
      ...sectionContent,
      [newId]: "<p>Add your content here...</p>",
    })
    setEditedTitles({
      ...editedTitles,
      [newId]: getSectionDisplayTitle(newId, newSectionData.time),
    })
    setProgress(Math.max(progress - 5, 0))
  }

  // Create an array of all section IDs to set as default expanded values
  const defaultExpandedSections = sections.map((section) => `section-${section.id}`)

  useEffect(() => {
    setAutoSaveStatus("saving")
    const timer = setTimeout(() => {
      setAutoSaveStatus("saved")
    }, 1000)
    return () => clearTimeout(timer)
  }, [sectionContent, sections])

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
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Oncology Patient Journey Research</h2>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Guide Structure</CardTitle>
                <CardDescription>Build your discussion guide section by section</CardDescription>
              </div>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Oncology Patient Journey Research</DialogTitle>
                      <DialogDescription>PharmaCorp Inc.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6 mt-4">
                      {sections.map((section) => (
                        <div key={section.id} className="space-y-2">
                          <h3 className="font-bold">{getSectionDisplayTitle(section.id, section.time)}</h3>
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{ __html: sectionContent[section.id] || "" }}
                          />
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Button className="bg-[#00A7E1] hover:bg-[#0089b8]">
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Accordion type="multiple" className="w-full" defaultValue={defaultExpandedSections}>
                {sections.map((section) => (
                  <AccordionItem key={section.id} value={`section-${section.id}`}>
                    <AccordionTrigger className="hover:bg-muted/50 px-3 rounded-md">
                      <div className="flex items-center gap-2">
                        <span>{section.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="border rounded-md p-4 mt-2 space-y-4">
                      {!section.generated ? ( // This logic might need adjustment if "generated" badge is fully removed
                        <>
                          <div className="space-y-2">
                            <Label htmlFor={`section-title-${section.id}`}>Section Title</Label>
                            <Input
                              id={`section-title-${section.id}`}
                              value={section.title}
                              onChange={(e) => {
                                setSections(
                                  sections.map((s) => (s.id === section.id ? { ...s, title: e.target.value } : s)),
                                )
                              }}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`section-time-${section.id}`}>Time (minutes)</Label>
                            <Input
                              id={`section-time-${section.id}`}
                              type="number"
                              value={section.time}
                              onChange={(e) => {
                                setSections(
                                  sections.map((s) =>
                                    s.id === section.id ? { ...s, time: Number.parseInt(e.target.value) || 0 } : s,
                                  ),
                                )
                              }}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`section-purpose-${section.id}`}>Section Purpose/Content</Label>
                            <Textarea
                              id={`section-purpose-${section.id}`}
                              placeholder="Describe the purpose of this section or add content..."
                              className="min-h-[80px]"
                              value={sectionContent[section.id] || ""}
                              onChange={(e) => setSectionContent({ ...sectionContent, [section.id]: e.target.value })}
                            />
                          </div>

                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Write Manually
                            </Button>
                            <Button
                              size="sm"
                              className="bg-[#00A7E1] hover:bg-[#0089b8]"
                              onClick={() => handleGenerateSection(section.id)}
                              disabled={generatingSection}
                            >
                              {generatingSection ? (
                                <>
                                  Generating... <Sparkles className="ml-2 h-4 w-4 animate-pulse" />
                                </>
                              ) : (
                                <>
                                  Generate Section <Sparkles className="ml-2 h-4 w-4" />
                                </>
                              )}
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-4">
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between items-center">
                                {editingSection === section.id ? (
                                  <Input
                                    value={editedTitles[section.id] || ""}
                                    onChange={(e) => handleTitleChange(section.id, e.target.value)}
                                    className="font-medium text-sm flex-grow mr-2"
                                  />
                                ) : (
                                  <h3 className="font-medium">{getSectionDisplayTitle(section.id, section.time)}</h3>
                                )}
                                <div className="flex gap-2">
                                  {editingSection === section.id ? (
                                    <>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50"
                                        onClick={() => saveEdits(section.id)}
                                      >
                                        <Check className="mr-2 h-3 w-3" />
                                        Save
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300 hover:bg-red-50"
                                        onClick={cancelEdits}
                                      >
                                        <X className="mr-2 h-3 w-3" />
                                        Cancel
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button variant="outline" size="sm" onClick={() => startEditing(section.id)}>
                                        <Edit className="mr-2 h-3 w-3" />
                                        Edit
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleAIAssist(section.id)}
                                        className="bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-700"
                                      >
                                        <Sparkles className="mr-2 h-3 w-3" />
                                        AI Assist
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </div>

                              {editingSection === section.id ? (
                                <RichTextEditor
                                  value={editedContent[section.id] || ""}
                                  onChange={(value) => handleEditChange(section.id, value)}
                                />
                              ) : (
                                <div
                                  className="mt-3 prose prose-sm max-w-none"
                                  dangerouslySetInnerHTML={{ __html: sectionContent[section.id] || "" }}
                                />
                              )}
                            </div>
                          </div>

                          {assistingWithAI === section.id && (
                            <div className="mt-4 space-y-2">
                              <Label htmlFor={`ai-assist-context-${section.id}`}>
                                How can AI assist with this section?
                              </Label>
                              <Textarea
                                id={`ai-assist-context-${section.id}`}
                                placeholder="e.g., 'add probing questions about X', 'rephrase for clarity', 'make this more concise'"
                                value={aiAssistContext}
                                onChange={(e) => setAiAssistContext(e.target.value)}
                                className="min-h-[120px] w-full"
                              />
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm" onClick={() => setAssistingWithAI(null)}>
                                  Cancel
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-teal-500 hover:bg-teal-600 text-white"
                                  onClick={() => handleAIAssist(section.id)}
                                  disabled={generatingSection}
                                >
                                  {generatingSection ? "Enhancing..." : "Enhance Section"}
                                </Button>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="flex justify-center mt-4">
                <Button variant="outline" onClick={addNewSection}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Another Section
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">{/* Back to Outline button removed */}</CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
