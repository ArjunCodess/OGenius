import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageBuilder } from "@/components/editor/image-builder/image-builder"
import { MetadataTab } from "@/components/editor/metadata-tab"

export default function EditorPage() {
  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">OG Image Editor</h1>
        <p className="text-muted-foreground">
          Create a custom Open Graph image for your website or social media.
        </p>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="editor">Image Editor</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <TabsContent value="editor" className="w-full">
            <ImageBuilder />
          </TabsContent>
          
          <TabsContent value="metadata" className="w-full">
            <MetadataTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}