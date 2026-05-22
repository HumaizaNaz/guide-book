'use client'
import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

export function CodeBlock({ children, ...props }: React.ComponentProps<'pre'>) {
  const [copied, setCopied] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)

  async function copy() {
    const text = preRef.current?.textContent ?? ''
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <button
        onClick={copy}
        aria-label="Copy code"
        className="absolute top-3 right-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1.5 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-300 z-10"
      >
        {copied ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
      </button>
      <pre ref={preRef} {...props}>{children}</pre>
    </div>
  )
}
