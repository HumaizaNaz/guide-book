import { MDXRemote } from 'next-mdx-remote/rsc'
import { CodeBlock } from './CodeBlock'
import remarkGfm from 'remark-gfm'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import type { Options } from 'rehype-pretty-code'

const prettyCodeOptions: Options = {
  theme: 'github-light',
  keepBackground: true,
}

const components = {
  pre: (props: React.ComponentProps<'pre'>) => <CodeBlock {...props} />,
}

export function GuideContent({ content }: { content: string }) {
  return (
    <div className="prose max-w-none">
      <MDXRemote
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
          },
        }}
        components={components}
      />
    </div>
  )
}
