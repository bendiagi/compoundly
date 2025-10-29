import type { Metadata } from 'next'
import './globals.css'
import ClientOnly from '@/components/ClientOnly'
import CustomCursor from '@/components/CustomCursor'
import DesktopNav from '@/components/DesktopNav'
import { ThemeProvider } from '@/components/ThemeProvider'

export const metadata: Metadata = {
  title: 'Compoundly - Compound Interest Calculator',
  description: 'See how your savings and investments can grow with the power of compound interest.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Compoundly - Compound Interest Calculator',
    description: 'See how your savings and investments can grow with the power of compound interest.',
    images: ['/compoundly-meta-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compoundly - Compound Interest Calculator',
    description: 'See how your savings and investments can grow with the power of compound interest.',
    images: ['/compoundly-meta-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ThemeProvider>
          <ClientOnly>
            <CustomCursor />
          </ClientOnly>
          <DesktopNav />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
} 