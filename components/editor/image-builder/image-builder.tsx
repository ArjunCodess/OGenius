'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ImagePreview } from '@/components/editor/image-builder/image-preview'
import { GradientPresets } from '@/components/editor/gradient-presets/gradient-presets'
import { GridSelector } from '@/components/editor/grid-selector/grid-selector'
import { Button } from '@/components/ui/button'
import { Download, PanelTop, GridIcon, Type } from 'lucide-react'

export function ImageBuilder() {
  const handleExport = () => {
    // This will be implemented in a future phase
    alert('Export functionality will be implemented in a future phase')
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
            <ImagePreview />
          </CardContent>
        </Card>
        
        {/* Settings Tabs - Larger */}
        <Card>
          <CardContent className="px-6 py-0">
            <Tabs defaultValue="background" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
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
              </TabsList>
              
              <TabsContent value="background" className="space-y-4">
                <GradientPresets />
                <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                  More color customization options will be available in future updates.
                </div>
              </TabsContent>
              
              <TabsContent value="grid" className="space-y-4">
                <GridSelector />
                <div className="p-4 bg-muted rounded-md text-sm text-muted-foreground">
                  Grid opacity and size adjustment will be available in future updates.
                </div>
              </TabsContent>
              
              <TabsContent value="content" className="space-y-4">
                <div className="p-6 bg-muted rounded-md flex flex-col items-center justify-center">
                  <p className="text-sm text-muted-foreground mb-2 text-center">
                    Text and image positioning will be available in the next phase.
                  </p>
                  <Button variant="outline" disabled>Add Text</Button>
                </div>
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
              Content editor will be implemented in Phase 2.
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
      >
        <Download className="mr-2 h-4 w-4" />
        Export Image
      </Button>
    </div>
  )
} 