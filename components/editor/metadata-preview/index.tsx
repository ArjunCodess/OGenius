import React from 'react'
import { SEOMetadata } from '@/types/metadata-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import OpenGraphPreview from './og-preview'
import TwitterPreview from './twitter-preview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MetadataPreviewProps {
  metadata: SEOMetadata
}

export default function MetadataPreview({ metadata }: MetadataPreviewProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Metadata Preview</CardTitle>
        <CardDescription>
          See how your page will appear when shared on social media
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="og" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="og">Open Graph</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
          </TabsList>
          <TabsContent value="og">
            <OpenGraphPreview metadata={metadata.openGraph} />
          </TabsContent>
          <TabsContent value="twitter">
            <TwitterPreview 
              metadata={metadata.twitter} 
              fallbackTitle={metadata.openGraph.title}
              fallbackDescription={metadata.openGraph.description}
              fallbackImage={metadata.openGraph.image}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 