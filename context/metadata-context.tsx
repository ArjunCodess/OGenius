import React, { createContext, useState, useContext, ReactNode } from 'react'
import { SEOMetadata } from '@/types/metadata-types'

// Default metadata values
const defaultMetadata: SEOMetadata = {
  openGraph: {
    title: 'OG Image Generator',
    description: 'Create beautiful Open Graph images for your content',
    image: '/placeholder-image.jpg',
    type: 'website',
    siteName: 'OG Image Generator',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@example',
  },
}

interface MetadataContextType {
  metadata: SEOMetadata
  updateMetadata: (metadata: SEOMetadata) => void
  updateOpenGraph: (openGraph: typeof defaultMetadata.openGraph) => void
  updateTwitter: (twitter: typeof defaultMetadata.twitter) => void
}

const MetadataContext = createContext<MetadataContextType | undefined>(undefined)

export function MetadataProvider({ children }: { children: ReactNode }) {
  const [metadata, setMetadata] = useState<SEOMetadata>(defaultMetadata)

  const updateMetadata = (newMetadata: SEOMetadata) => {
    setMetadata(newMetadata)
  }

  const updateOpenGraph = (openGraph: typeof defaultMetadata.openGraph) => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      openGraph,
    }))
  }

  const updateTwitter = (twitter: typeof defaultMetadata.twitter) => {
    setMetadata((prevMetadata) => ({
      ...prevMetadata,
      twitter,
    }))
  }

  return (
    <MetadataContext.Provider value={{ metadata, updateMetadata, updateOpenGraph, updateTwitter }}>
      {children}
    </MetadataContext.Provider>
  )
}

export function useMetadata() {
  const context = useContext(MetadataContext)
  if (context === undefined) {
    throw new Error('useMetadata must be used within a MetadataProvider')
  }
  return context
} 