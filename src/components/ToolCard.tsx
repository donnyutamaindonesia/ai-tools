import { useState } from 'react'

interface ToolCardProps {
  icon: string
  title: string
  description: string
  placeholder: string
  tool: string
  extraInput?: React.ReactNode
}

export default function ToolCard({ icon, title, description, placeholder, tool, extraInput }: ToolCardProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  const run = async () => {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')

    try {
      const res = await fetch('/api/claude', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tool, prompt: input }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '请求失败')
      setOutput(data.text)
    } catch (e: unknown) {
      setOutput(e instanceof Error ? e.message : '出错了，请稍后重试。')
    }
    setLoading(false)
  }

  const copy = () => navigator.clipboard.writeText(output)

  return (
    <div className="tool-card">
      <div className="tool-header">
        <span className="tool-icon">{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {extraInput}

      <textarea
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={placeholder}
        rows={5}
      />

      <button onClick={run} disabled={loading || !input.trim()}>
        {loading ? '生成中...' : '开始生成'}
      </button>

      {output && (
        <div className="output">
          <div className="output-header">
            <span>生成结果</span>
            <button className="copy-btn" onClick={copy}>复制</button>
          </div>
          <div className="output-text">{output}</div>
        </div>
      )}
    </div>
  )
}
