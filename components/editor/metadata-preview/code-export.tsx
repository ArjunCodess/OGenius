"use client"

import React, { useState } from 'react'
import { SEOMetadata } from '@/types/metadata-types'
import { generateMetaTags } from '@/lib/metadata-utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface CodeExportProps {
  metadata: SEOMetadata
}

export default function CodeExport({ metadata }: CodeExportProps) {
  const [copied, setCopied] = useState(false)
  const metaTags = generateMetaTags(metadata)

  // Generate HTML/JSX code (they are identical)
  const htmlJsxCode = metaTags.map(tag => 
    `<meta property="${tag.property}" content="${tag.content}" />`
  ).join('\n')

  // Generate Next.js Metadata API code
  const nextMetadataCode = `
export const metadata = {
  openGraph: {
    title: '${metadata.openGraph.title}',
    description: '${metadata.openGraph.description}',
    images: ['${metadata.openGraph.image}'],
    ${metadata.openGraph.url ? `url: '${metadata.openGraph.url}',` : ''}
    ${metadata.openGraph.type ? `type: '${metadata.openGraph.type}',` : ''}
    ${metadata.openGraph.siteName ? `siteName: '${metadata.openGraph.siteName}',` : ''}
    ${metadata.openGraph.locale ? `locale: '${metadata.openGraph.locale}',` : ''}
  },
  twitter: {
    card: '${metadata.twitter.card}',
    ${metadata.twitter.title ? `title: '${metadata.twitter.title}',` : ''}
    ${metadata.twitter.description ? `description: '${metadata.twitter.description}',` : ''}
    ${metadata.twitter.image ? `images: ['${metadata.twitter.image}'],` : ''}
    ${metadata.twitter.site ? `creator: '${metadata.twitter.site}',` : ''}
    ${metadata.twitter.creator ? `creator: '${metadata.twitter.creator}',` : ''}
  },
}`

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Export Code</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="htmljsx" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="htmljsx">HTML/JSX</TabsTrigger>
            <TabsTrigger value="next">Next.js API</TabsTrigger>
          </TabsList>
          <TabsContent value="htmljsx" className="mt-4">
            <div className="relative">
              <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md overflow-auto text-sm">
                <code>{htmlJsxCode}</code>
              </pre>
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(htmlJsxCode)}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="next" className="mt-4">
            <div className="relative">
              <pre className="bg-slate-100 dark:bg-slate-900 p-4 rounded-md overflow-auto text-sm">
                <code>{nextMetadataCode}</code>
              </pre>
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute top-2 right-2"
                onClick={() => copyToClipboard(nextMetadataCode)}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}