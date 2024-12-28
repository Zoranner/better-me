<script setup lang="ts">
import { ref, nextTick, watch } from 'vue'
import { marked } from 'marked'
import hljs from 'highlight.js'
import katex from 'katex'
import mermaid from 'mermaid'
import 'highlight.js/styles/github-dark.css'
import 'katex/dist/katex.min.css'

const props = defineProps<{
  content: string
}>()

const htmlContent = ref('')

// 配置 mermaid
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose'
})

// 配置 marked
const renderer = new marked.Renderer()

// 扩展渲染器以支持数学公式和 mermaid
renderer.code = function({ text, lang }: { text: string, lang?: string }): string {
  if (lang === 'math') {
    try {
      const html = katex.renderToString(text.trim(), {
        displayMode: true,
        throwOnError: false,
        output: 'html'
      })
      return `<div class="math">${html}</div>`
    } catch (error: unknown) {
      console.error('KaTeX error:', error)
      return `<pre>Error rendering math: ${error instanceof Error ? error.message : 'Unknown error'}</pre>`
    }
  }
  
  if (lang === 'mermaid') {
    return `<div class="mermaid">${text.trim()}</div>`
  }
  
  if (lang) {
    const highlighted = hljs.highlight(text.trim(), { language: lang }).value
    return `<pre><code class="hljs">${highlighted}</code></pre>`
  }
  
  return `<pre><code>${hljs.highlightAuto(text.trim()).value}</code></pre>`
} as any

renderer.text = function(text: string | { text: string }): string {
  const content = typeof text === 'string' ? text : text.text
  // 匹配 $...$ 形式的行内数学公式
  const parts = content.split(/(\$[^\$]+\$)/g)
  return parts.map((part: string) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      try {
        const math = part.slice(1, -1)
        return katex.renderToString(math, {
          displayMode: false,
          throwOnError: false
        })
      } catch (error: unknown) {
        console.error('KaTeX error:', error)
        return `[Math Error: ${error instanceof Error ? error.message : 'Unknown error'}]`
      }
    }
    return part
  }).join('')
} as any

marked.setOptions({
  renderer,
  gfm: true,
  pedantic: false,
  breaks: true,
  silent: true,
  headerPrefix: ''
} as any)

// 设置 marked 的 tokenizer 和 walkTokens 钩子
const tokenizer = new marked.Tokenizer()
const walkTokens = (token: any) => {
  if (token.type === 'code') {
    const { text, lang } = token
    if (lang && hljs.getLanguage(lang)) {
      token.text = hljs.highlight(text, { language: lang }).value
    } else {
      token.text = hljs.highlightAuto(text).value
    }
  }
}

marked.setOptions({ tokenizer, walkTokens })

const renderContent = async () => {
  try {
    // 使用 marked.parse 的同步版本
    const html = marked.parse(props.content, { async: false }) as string
    htmlContent.value = html
    
    // 等待 DOM 更新后初始化 mermaid 图表
    await nextTick()
    const mermaidDivs = document.querySelectorAll('.mermaid')
    mermaidDivs.forEach(async (element) => {
      try {
        const source = element.textContent || ''
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, source)
        element.innerHTML = svg
      } catch (error: unknown) {
        console.error('Mermaid error:', error)
        element.innerHTML = `<pre>Error rendering diagram: ${error instanceof Error ? error.message : 'Unknown error'}</pre>`
      }
    })
  } catch (error: unknown) {
    console.error('Markdown rendering error:', error)
    htmlContent.value = `<pre>Error rendering markdown: ${error instanceof Error ? error.message : 'Unknown error'}</pre>`
  }
}

watch(() => props.content, renderContent, { immediate: true })
</script>

<template>
  <div class="markdown-body" v-html="htmlContent"></div>
</template>

<style>
.markdown-body {
  color: #e4e4e7;
  font-size: 14px;
  line-height: 1.6;
}

.markdown-body pre {
  background-color: #27272a;
  padding: 16px;
  border-radius: 6px;
  overflow-x: auto;
  margin: 16px 0;
}

.markdown-body code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.9em;
}

.markdown-body p code {
  background-color: #27272a;
  padding: 2px 4px;
  border-radius: 4px;
}

.markdown-body .math {
  overflow-x: auto;
  padding: 8px 0;
  margin: 16px 0;
}

.markdown-body .mermaid {
  background-color: #27272a;
  padding: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  margin: 16px 0;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body h1 { font-size: 2em; }
.markdown-body h2 { font-size: 1.5em; }
.markdown-body h3 { font-size: 1.25em; }
.markdown-body h4 { font-size: 1em; }
.markdown-body h5 { font-size: 0.875em; }
.markdown-body h6 { font-size: 0.85em; }

.markdown-body p {
  margin-top: 0;
  margin-bottom: 16px;
}

.markdown-body ul,
.markdown-body ol {
  margin-top: 0;
  margin-bottom: 16px;
  padding-left: 2em;
}

.markdown-body blockquote {
  margin: 0 0 16px;
  padding: 0 1em;
  color: #8b8b8b;
  border-left: 0.25em solid #3f3f46;
}

.markdown-body table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
}

.markdown-body table th,
.markdown-body table td {
  padding: 6px 13px;
  border: 1px solid #3f3f46;
}

.markdown-body table tr {
  background-color: #18181b;
}

.markdown-body table tr:nth-child(2n) {
  background-color: #27272a;
}

.markdown-body img {
  max-width: 100%;
  height: auto;
  margin: 16px 0;
}

.markdown-body hr {
  height: 0.25em;
  padding: 0;
  margin: 24px 0;
  background-color: #3f3f46;
  border: 0;
}

.markdown-body > :first-child {
  margin-top: 0;
}

.markdown-body > :last-child {
  margin-bottom: 0;
}
</style> 