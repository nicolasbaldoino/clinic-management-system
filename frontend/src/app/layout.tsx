import { Providers } from '@/components/providers'
import './globals.css'

import { Toaster } from '@/components/ui/sonner'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MedClinic - Sistema de Gestão de Clínicas Médicas',
  description: 'Sistema de gestão de clínicas médicas com suporte multi-tenant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} antialiased`}>
        <Toaster />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
