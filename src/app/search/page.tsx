"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Search, Filter, Calendar, User, Building, MapPin } from "lucide-react"

export default function SearchPage() {
  const [selectedGuides, setSelectedGuides] = useState<string[]>([])

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
            <div className="flex items-center gap-2">
              <Image
                src="/images/tlg-logo-large.svg"
                alt="The Link Group Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold">| Search Discussion Guides</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Clear Filters
            </Button>
            <Link href="/new-guide/upload">
              <Button size="sm" className="bg-[#00A7E1] hover:bg-[#0089b8]">
                Use Selected ({selectedGuides.length})
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search by title, topic, client, or keyword..." className="pl-8" />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
                <CardDescription>Refine your search results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Research Topic</Label>
                  <div className="space-y-1 max-h-40 overflow-y-auto pr-2">
                    {[
                      "Usage, Attitude and Awareness",
                      "Customer Profiling",
                      "Advertising/Promotion",
                      "Concept",
                      "Customer Satisfaction",
                      "Data Mining/Data Analytics",
                      "Exploratory Insights",
                      "Health",
                      "Journeys",
                      "Messaging",
                      "Naming/Branding/Logo",
                      "Patient Support",
                      "Pricing",
                    ].map((topic, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`topic-${i}`} />
                        <label
                          htmlFor={`topic-${i}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {topic}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Client Company - Customer Type</Label>
                  <div className="space-y-1">
                    {[
                      "Consumer Goods",
                      "Financial",
                      "Healthcare",
                      "Petroleum",
                      "Retail",
                      "Technology",
                      "Telecommunications",
                    ].map((type, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`company-type-${i}`} />
                        <label
                          htmlFor={`company-type-${i}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Healthcare - Disease State</Label>
                  <div className="space-y-1">
                    {["Chronic Pain", "Neuromuscular", "Oncology", "Diabetes", "Cardiology"].map((state, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`disease-state-${i}`} />
                        <label
                          htmlFor={`disease-state-${i}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {state}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Detailed Subject - Non-Healthcare</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="car-care">Car Care</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="beverage">Beverage</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="insurance">Insurance</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Research Targets</Label>
                  <div className="space-y-1">
                    {["Consumers", "Patients", "Healthcare Providers", "Neurologists", "Caregivers"].map(
                      (target, i) => (
                        <div key={i} className="flex items-center space-x-2">
                          <Checkbox id={`target-${i}`} />
                          <label
                            htmlFor={`target-${i}`}
                            className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {target}
                          </label>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Overall Methods</Label>
                  <div className="space-y-1">
                    {[
                      "Qualitative",
                      "Quantitative",
                      "Lead Opportunity",
                      "Onsite / Ethnography",
                      "Report Synthesis",
                    ].map((method, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Checkbox id={`method-${i}`} />
                        <label
                          htmlFor={`method-${i}`}
                          className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {method}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="md:col-span-3 space-y-4">
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All Guides</TabsTrigger>
                  <TabsTrigger value="recent">Recently Used</TabsTrigger>
                  <TabsTrigger value="saved">Saved Searches</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="space-y-4 mt-4">
                  {[
                    {
                      title: "Oncology Patient Journey",
                      client: "PharmaCorp Inc.",
                      date: "Mar 2023",
                      topic: "Journeys",
                      target: "Patients",
                      region: "US",
                    },
                    {
                      title: "Diabetes Treatment Satisfaction",
                      client: "MediHealth",
                      date: "Jan 2023",
                      topic: "Customer Satisfaction",
                      target: "Patients",
                      region: "Global",
                    },
                    {
                      title: "HCP Prescribing Behavior",
                      client: "BioScience Ltd.",
                      date: "Nov 2022",
                      topic: "Usage, Attitude and Awareness",
                      target: "Healthcare Providers",
                      region: "EU",
                    },
                    {
                      title: "Rare Disease Patient Support Needs",
                      client: "RareCare",
                      date: "Oct 2022",
                      topic: "Patient Support",
                      target: "Patients & Caregivers",
                      region: "Global",
                    },
                    {
                      title: "Car Care Product Usage",
                      client: "Black Magic",
                      date: "Feb 2023",
                      topic: "Usage, Attitude and Awareness",
                      target: "Consumers",
                      region: "US",
                    },
                  ].map((guide, i) => (
                    <Card key={i} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <CardHeader className="md:flex-1">
                          <div className="flex items-center justify-between">
                            <CardTitle>{guide.title}</CardTitle>
                            <Checkbox
                              id={`select-${i}`}
                              checked={selectedGuides.includes(guide.title)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedGuides([...selectedGuides, guide.title])
                                } else {
                                  setSelectedGuides(selectedGuides.filter((g) => g !== guide.title))
                                }
                              }}
                            />
                          </div>
                          <CardDescription>
                            <div className="flex flex-wrap gap-2 mt-2">
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Building className="h-3 w-3" />
                                {guide.client}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {guide.date}
                              </Badge>
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 bg-[#e6f7fc] text-[#00A7E1] border-[#00A7E1]/20"
                              >
                                <User className="h-3 w-3" />
                                {guide.target}
                              </Badge>
                              <Badge variant="outline" className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {guide.region}
                              </Badge>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardFooter className="flex flex-row md:flex-col justify-end gap-2 p-4 bg-muted/50">
                          <Button variant="outline" size="sm">
                            Preview
                          </Button>
                          <Button size="sm" className="bg-[#00A7E1] hover:bg-[#0089b8]">
                            Select
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="recent" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Recently Used Guides</CardTitle>
                      <CardDescription>Guides you&apos;ve accessed in the last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>You haven&apos;t accessed any guides recently.</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="saved" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Searches</CardTitle>
                      <CardDescription>Your saved search filters</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>You don&apos;t have any saved searches yet.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Showing 5 of 3,342 guides</p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
