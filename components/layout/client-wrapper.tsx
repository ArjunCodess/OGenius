"use client"

import React, { ReactNode } from 'react'
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MainLayout } from "@/components/layout/main-layout"
import ClientProviders from "@/components/layout/client-providers"

interface ClientWrapperProps {
  children: ReactNode
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <div className="relative flex flex-col">
      <ClientProviders>
        <Header />
        <MainLayout>
          <main className="flex-1">{children}</main>
        </MainLayout>
        <Footer />
      </ClientProviders>
    </div>
  )
} 