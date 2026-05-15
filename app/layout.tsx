import type { Metadata } from 'next'

import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Geist_Mono, Geist_Mono as V0_Font_Geist_Mono } from 'next/font/google'

// Initialize fonts
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })

export const metadata: Metadata = {
  title: 'Ohhh.....',
  description: 'This website is under construction. We are building something amazing here! Stay tuned! If you also want to build one, get in touch!',
  icons: {
    icon: [
      {
        url: '/Cloudcode-black-round.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/cloudcodeLogo-white.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/Cloudcode-black-round.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
