import { Loader2 } from "lucide-react"

export default function GlobalLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-12 w-12 animate-spin text-[#00A7E1]" />
      <p className="mt-4 text-lg text-muted-foreground">{message}</p>
    </div>
  )
}
