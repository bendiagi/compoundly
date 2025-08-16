import type { Metadata } from 'next'
import './globals.css'
import ClientOnly from '@/components/ClientOnly'
import CustomCursor from '@/components/CustomCursor'

export const metadata: Metadata = {
  title: 'Compoundly - Compound Interest Calculator',
  description: 'Visualize your investment growth with precision using our compound interest calculator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <ClientOnly>
          <CustomCursor />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
} 