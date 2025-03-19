import React from 'react'
import { SEOMetadata } from '@/types/metadata-types'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import OpenGraphForm from './og-form'
import TwitterForm from './twitter-form'

interface MetadataEditorProps {
  metadata: SEOMetadata
  onChange: (metadata: SEOMetadata) => void
}

export default function MetadataEditor({ metadata, onChange }: MetadataEditorProps) {
  const handleOpenGraphChange = (openGraph: typeof metadata.openGraph) => {
    onChange({
      ...metadata,
      openGraph,
    })
  }

  const handleTwitterChange = (twitter: typeof metadata.twitter) => {
    onChange({
      ...metadata,
      twitter,
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Metadata Editor</CardTitle>
        <CardDescription>
          Configure how your page appears when shared on social media
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="og" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="og">Open Graph</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
          </TabsList>
          <TabsContent value="og">
            <OpenGraphForm
              openGraph={metadata.openGraph}
              onChange={handleOpenGraphChange}
            />
          </TabsContent>
          <TabsContent value="twitter">
            <TwitterForm
              twitter={metadata.twitter}
              onChange={handleTwitterChange}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
} 