"use client"

// TODO: Replace document.execCommand with a modern rich text editor library
// The current implementation uses document.execCommand, which is largely deprecated
// and has limitations. For long-term stability and better features,
// this component should be refactored using a library like Tiptap, Lexical, or Plate.

import { useState, useEffect } from "react"
import { Bold, Italic, List, ListOrdered } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function RichTextEditor({ value, onChange, className = "" }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Handle execCommand for basic formatting
  const handleFormat = (command: string, value = "") => {
    document.execCommand(command, false, value)
    // Capture the updated content after formatting
    const content = document.getElementById("rich-text-editor")?.innerHTML
    if (content) {
      onChange(content)
    }
  }

  // Only render the editor on the client side
  if (!isMounted) {
    return <div className="min-h-[300px] border rounded-md p-3 bg-white">Loading editor...</div>
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-1 border-b pb-2">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("bold")}
          className="h-8 w-8 p-0"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("italic")}
          className="h-8 w-8 p-0"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("insertUnorderedList")}
          className="h-8 w-8 p-0"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleFormat("insertOrderedList")}
          className="h-8 w-8 p-0"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
      </div>
      <div
        id="rich-text-editor"
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className={`min-h-[300px] border rounded-md p-3 bg-white focus:outline-none overflow-y-auto ${className}`}
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
        }}
      />
    </div>
  )
}
