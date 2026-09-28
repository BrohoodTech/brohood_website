import { Analytics } from '@vercel/analytics/next'
import { DM_Sans, Instrument_Serif } from 'next/font/google'
import type { Metadata, Viewport } from 'next'

const bodyFont = DM_Sans({ subsets: ['latin'], variable: '--font-body' })
const displayFont = Instrument_Serif({ subsets: ['latin'], weight: '400', variable: '--font-display' })
import './globals.css'

export const metadata: Metadata = {
  title: 'Brohood — Made for the in-between',
  description: 'Considered everyday essentials for the life you actually live.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import { GlobalShell } from '@/components/global-shell'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="antialiased bg-[#08080a] text-white">
        <GlobalShell>{children}</GlobalShell>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
