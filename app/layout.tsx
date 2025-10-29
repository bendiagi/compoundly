import type { Metadata } from 'next'
import Script from 'next/script'
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
        {/* Google Analytics */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-ZE8CKLH09M" strategy="afterInteractive" />
        <Script id="ga-gtag" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);} 
gtag('js', new Date());
gtag('config', 'G-ZE8CKLH09M');`}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "txyry6hep2");`}
        </Script>
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