"use client"

import React, { ReactNode } from 'react'
import { MetadataProvider } from '@/context/metadata-context'
import { EditorProvider } from '@/context/editor-context'
import { Toaster } from 'sonner'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <MetadataProvider>
      <EditorProvider>
        {children}
        <Toaster />
      </EditorProvider>
    </MetadataProvider>
  )
} 