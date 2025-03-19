'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImagePreview } from '@/components/editor/image-builder/image-preview'
import { GradientPresets } from '@/components/editor/gradient-presets/gradient-presets'
import { GridSelector } from '@/components/editor/grid-selector/grid-selector'
import { Button } from '@/components/ui/button'
import { Download, PanelTop, GridIcon, Type, Link2 } from 'lucide-react'
import ConfigMetadataLink from '@/components/editor/integration/config-metadata-link'
import { useState } from 'react'
import { OGImageConfig } from '@/types/image-types'
import { toast } from 'sonner'

// Default placeholder config
const defaultConfig: OGImageConfig = {
  width: 1200,
  height: 630,
  background: {
    type: 'linear',
    direction: 'to right',
    colors: [
      { color: '#4F46E5', position: 0 },
      { color: '#7C3AED', position: 100 }
    ]
  },
  grid: {
    type: 'grid',
    color: '#FFFFFF',
    opacity: 10,
    size: 40,
    spacing: 10
  },
  text: [],
  images: []
}

export function ImageBuilder() {
  const [config, setConfig] = useState<OGImageConfig>(defaultConfig)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleExport = async () => {
    try {
      setIsGenerating(true)
      
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      })

      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      // Get the blob from the response
      const blob = await response.blob()
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob)
      
      // Create a temporary link element
      const link = document.createElement('a')
      link.href = url
      link.download = 'og-image.png'
      
      // Append to body, click, and remove
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Clean up the URL
      window.URL.revokeObjectURL(url)
      
      toast.success('Image generated successfully!')
    } catch (error) {
      console.error('Error generating image:', error)
      toast.error('Failed to generate image')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Preview Section and Settings Tabs - Equal Width */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="overflow-hidden pb-4 px-4 gap-4">
          <CardHeader>
            <CardTitle className="text-md flex items-center">
              <PanelTop className="mr-2 h-4 w-4" />
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ImagePreview config={config} />
          </CardContent>
        </Card>
        
        {/* Settings Tabs - Larger */}
        <Card>
          <CardContent className="px-6 py-0">
            <Tabs defaultValue="background" className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="background" className="flex items-center">
                  <div className="mr-2 h-4 w-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  Background
                </TabsTrigger>
                <TabsTrigger value="grid" className="flex items-center">
                  <GridIcon className="mr-2 h-4 w-4" />
                  Grid
                </TabsTrigger>
                <TabsTrigger value="content" className="flex items-center">
                  <Type className="mr-2 h-4 w-4" />
                  Content
                </TabsTrigger>
                <TabsTrigger value="metadata" className="flex items-center">
                  <Link2 className="mr-2 h-4 w-4" />
                  Metadata
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="background" className="space-y-4 mt-4">
                <GradientPresets onSelect={(colors) => {
                  setConfig(prev => ({
                    ...prev,
                    background: {
                      type: 'linear',
                      direction: 'to right',
                      colors: colors.map((color, index) => ({
                        color,
                        position: (index / (colors.length - 1)) * 100
                      }))
                    }
                  }))
                }} />
                <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                  More color customization options will be available in future updates.
                </div>
              </TabsContent>
              
              <TabsContent value="grid" className="space-y-4 mt-4">
                <GridSelector 
                  config={config.grid}
                  onChange={(grid) => setConfig(prev => ({ ...prev, grid }))}
                />
                <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                  Grid opacity and size adjustment will be available in future updates.
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4 mt-4">
                <div className="p-6 bg-muted rounded-md flex flex-col items-center justify-center">
                  <p className="text-sm text-muted-foreground mb-2 text-center">
                    Text and image positioning will be available in Phase 3.
                  </p>
                  <Button variant="outline" disabled>Add Text</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="metadata" className="space-y-4 mt-4">
                <ConfigMetadataLink imageConfig={config} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      {/* Content Editor Section - Separate Window */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-md flex items-center">
            <Type className="mr-2 h-4 w-4" />
            Content Editor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 items-center justify-center p-8 border-2 border-dashed rounded-lg">
            <p className="text-center text-muted-foreground">
              Content editor will be implemented in Phase 3.
              <br />
              You&apos;ll be able to add text, upload images, and position content here.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" disabled>Add Text</Button>
              <Button variant="outline" disabled>Upload Image</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Export Button - Full Width */}
      <Button 
        onClick={handleExport} 
        size="lg"
        className="w-full flex items-center justify-center"
        disabled={isGenerating}
      >
        <Download className="mr-2 h-4 w-4" />
        {isGenerating ? 'Generating...' : 'Export Image'}
      </Button>
    </div>
  )
} 