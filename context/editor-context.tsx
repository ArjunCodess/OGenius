'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { OGImageConfig, GradientSettings, GridSettings, TextSettings, ImageSettings } from '@/types/image-types'
import { getGradientPresets } from '@/lib/gradient-utils'
import { getGridPresets } from '@/lib/grid-utils'

// Default OG Image dimensions
const DEFAULT_WIDTH = 1200
const DEFAULT_HEIGHT = 630

// Default configuration
const defaultConfig: OGImageConfig = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  background: getGradientPresets()[0],
  grid: getGridPresets()[0],
  text: [],
  images: [],
}

interface EditorContextType {
  config: OGImageConfig
  setConfig: (config: OGImageConfig) => void
  updateBackground: (background: GradientSettings) => void
  updateGrid: (grid: GridSettings) => void
  addText: (text: TextSettings) => void
  updateText: (index: number, text: TextSettings) => void
  removeText: (index: number) => void
  addImage: (image: ImageSettings) => void
  updateImage: (index: number, image: ImageSettings) => void
  removeImage: (index: number) => void
  resetConfig: () => void
}

const EditorContext = createContext<EditorContextType | undefined>(undefined)

export function EditorProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<OGImageConfig>(defaultConfig)

  const updateBackground = (background: GradientSettings) => {
    setConfig((prev) => ({ ...prev, background }))
  }

  const updateGrid = (grid: GridSettings) => {
    setConfig((prev) => ({ ...prev, grid }))
  }

  const addText = (text: TextSettings) => {
    setConfig((prev) => ({
      ...prev,
      text: [...prev.text, text],
    }))
  }

  const updateText = (index: number, text: TextSettings) => {
    setConfig((prev) => {
      const newText = [...prev.text]
      newText[index] = text
      return { ...prev, text: newText }
    })
  }

  const removeText = (index: number) => {
    setConfig((prev) => {
      const newText = [...prev.text]
      newText.splice(index, 1)
      return { ...prev, text: newText }
    })
  }

  const addImage = (image: ImageSettings) => {
    setConfig((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }))
  }

  const updateImage = (index: number, image: ImageSettings) => {
    setConfig((prev) => {
      const newImages = [...prev.images]
      newImages[index] = image
      return { ...prev, images: newImages }
    })
  }

  const removeImage = (index: number) => {
    setConfig((prev) => {
      const newImages = [...prev.images]
      newImages.splice(index, 1)
      return { ...prev, images: newImages }
    })
  }

  const resetConfig = () => {
    setConfig(defaultConfig)
  }

  return (
    <EditorContext.Provider
      value={{
        config,
        setConfig,
        updateBackground,
        updateGrid,
        addText,
        updateText,
        removeText,
        addImage,
        updateImage,
        removeImage,
        resetConfig,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  
  return context
} 