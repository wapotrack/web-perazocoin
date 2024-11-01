// app/layout.tsx
import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Perazzo Coins',
  description: 'Aca podes ver las monedas de octavio',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body className='bg-gradient-to-br from-indigo-200 via-white to-pink-100' >
          <div className='bg-gta bg-no-repeat bg-cover fixed w-full h-full opacity-15'>
        </div>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}