"use client"

import { MetaTag } from '@/types/metadata-types'
import React from 'react'
import Head from 'next/head'

interface MetaTagsProps {
  tags: MetaTag[]
}

/**
 * Component that renders metadata tags for SEO
 * This is used to inject meta tags into the head of the document
 */
export function MetaTags({ tags }: MetaTagsProps) {
  return (
    <Head>
      {tags.map((tag, index) => (
        <meta key={`${tag.property}-${index}`} property={tag.property} content={tag.content} />
      ))}
    </Head>
  )
} 