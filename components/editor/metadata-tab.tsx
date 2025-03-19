"use client"

import React from 'react'
import MetadataEditor from "@/components/editor/metadata-editor"
import MetadataPreview from "@/components/editor/metadata-preview"
import CodeExport from "@/components/editor/metadata-preview/code-export"
import { useMetadata } from "@/context/metadata-context"

export function MetadataTab() {
  const { metadata, updateMetadata } = useMetadata()

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetadataEditor 
          metadata={metadata} 
          onChange={updateMetadata} 
        />
        <MetadataPreview metadata={metadata} />
      </div>
      <CodeExport metadata={metadata} />
    </div>
  )
} 