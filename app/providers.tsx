"use client"

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
