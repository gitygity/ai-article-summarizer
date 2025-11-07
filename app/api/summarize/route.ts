import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { text } = await request.json()

  if (!text) {
    return NextResponse.json({ error: 'No text provided' }, { status: 400 })
  }

  const response = await fetch('https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: text }),
  })

  const data = await response.json()

  if (!response.ok) {
    return NextResponse.json({ error: data.error || 'Failed to summarize' }, { status: 500 })
  }

  const summary = data?.[0]?.summary_text || 'No summary generated'
  return NextResponse.json({ summary:summary|| 'No summary returned' })
}
