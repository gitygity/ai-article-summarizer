import './globals.css'
import ReactQueryProvider from './providers/ReactQueryProvider'

export const metadata = {
  title: 'AI Summarizer',
  description: 'Solo Project for Chingu',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
