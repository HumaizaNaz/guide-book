'use client'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeRaw from 'rehype-raw'
import { CodeBlock } from './CodeBlock'

export function ClientMarkdown({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          pre: (props) => <CodeBlock {...(props as React.ComponentProps<'pre'>)} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
