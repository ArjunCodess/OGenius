import { MetaTag } from '@/types/metadata-types'
import React from 'react'

interface MetadataProps {
  tags: MetaTag[]
}

/**
 * Component that renders metadata tags for SEO
 * This is used in the Head component of the application
 */
export function Metadata({ tags }: MetadataProps) {
  return (
    <>
      {tags.map((tag, index) => (
        <meta key={`${tag.property}-${index}`} property={tag.property} content={tag.content} />
      ))}
    </>
  )
} 