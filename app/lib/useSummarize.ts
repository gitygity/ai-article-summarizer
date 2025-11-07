'use client'

import { useMutation } from '@tanstack/react-query'

export function useSummarize() {
  return useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) {
        const txt = await res.text()
        throw new Error(`Request failed: ${res.status} — ${txt}`)
      }

      const data = await res.json()
      return data.summary
    },
    
  })
}
