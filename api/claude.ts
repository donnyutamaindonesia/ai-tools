import type { VercelRequest, VercelResponse } from '@vercel/node'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPTS: Record<string, string> = {
  writing: '你是一位专业的中文写作助手。帮助用户写作、润色文章，使内容更加流畅、专业。',
  translation: '你是一位专业翻译。将用户提供的内容准确翻译，保持原意的同时使语言自然流畅。用户会指定目标语言。',
  resume: '你是一位专业的简历顾问。帮助用户优化简历内容，突出亮点，使其更具竞争力。提供具体的修改建议。',
  contract: '你是一位专业的法律文件助手。根据用户需求生成规范的合同文本。注意：生成的合同仅供参考，正式使用需咨询专业律师。',
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { tool, prompt } = req.body

  if (!tool || !prompt) {
    return res.status(400).json({ error: '缺少参数' })
  }

  const systemPrompt = SYSTEM_PROMPTS[tool]
  if (!systemPrompt) {
    return res.status(400).json({ error: '无效工具' })
  }

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 2048,
      system: systemPrompt,
      messages: [{ role: 'user', content: prompt }],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    return res.status(200).json({ text })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'AI 服务出错，请稍后重试' })
  }
}
