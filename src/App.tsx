import { useState } from 'react'
import ToolCard from './components/ToolCard'
import './App.css'

const TOOLS = [
  {
    id: 'writing',
    icon: '✍️',
    title: 'AI 写作助手',
    description: '文章写作、内容润色、创意生成',
    placeholder: '例如：帮我写一篇关于人工智能未来发展的文章，500字左右...',
  },
  {
    id: 'translation',
    icon: '🌐',
    title: 'AI 翻译',
    description: '中英互译、多语言翻译',
    placeholder: '例如：请将以下内容翻译成英文：\n人工智能正在改变我们的生活方式...',
  },
  {
    id: 'resume',
    icon: '📄',
    title: 'AI 简历优化',
    description: '简历润色、亮点提炼、求职建议',
    placeholder: '粘贴你的简历内容，AI 帮你优化...',
  },
  {
    id: 'contract',
    icon: '📋',
    title: 'AI 合同生成',
    description: '劳动合同、服务协议、保密协议',
    placeholder: '例如：生成一份软件开发服务合同，甲方为大鹭科技，乙方为个人开发者，项目金额5万元...',
  },
]

export default function App() {
  const [activeTool, setActiveTool] = useState('writing')
  const tool = TOOLS.find(t => t.id === activeTool)!

  return (
    <div className="app">
      <header className="header">
        <div className="logo">
          <span>⚡</span>
          <span>大鹭 AI 工具</span>
        </div>
        <p className="tagline">AI 赋能中小企业，提升工作效率</p>
      </header>

      <nav className="nav">
        {TOOLS.map(t => (
          <button
            key={t.id}
            className={activeTool === t.id ? 'active' : ''}
            onClick={() => setActiveTool(t.id)}
          >
            {t.icon} {t.title}
          </button>
        ))}
      </nav>

      <main>
        <ToolCard
          key={activeTool}
          icon={tool.icon}
          title={tool.title}
          description={tool.description}
          placeholder={tool.placeholder}
          tool={tool.id}
        />
      </main>

      <footer>
        <p>© 2026 大鹭科技(泉州)有限公司 · Powered by Claude AI</p>
      </footer>
    </div>
  )
}
