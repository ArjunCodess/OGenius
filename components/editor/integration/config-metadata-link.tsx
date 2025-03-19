"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useMetadata } from '@/context/metadata-context'
import { linkImageConfigToMetadata } from '@/lib/metadata-utils'
import { OGImageConfig } from '@/types/image-types'
import { toast } from 'sonner'

interface ConfigMetadataLinkProps {
  imageConfig: OGImageConfig
}

export default function ConfigMetadataLink({ imageConfig }: ConfigMetadataLinkProps) {
  const { metadata, updateMetadata } = useMetadata()

  const handleLinkConfig = () => {
    const updatedMetadata = linkImageConfigToMetadata(metadata, imageConfig)
    updateMetadata(updatedMetadata)
    toast.success('Metadata updated with current image configuration')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link Configuration</CardTitle>
        <CardDescription>
          Connect your image configuration with your metadata
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Update your metadata to use the generated image from your current configuration.
          This will set the image URL to point to the API endpoint that will generate your image.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleLinkConfig}>
          Update Metadata with Current Image Config
        </Button>
      </CardFooter>
    </Card>
  )
} 