'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { OGImageConfig } from '@/types/image-types'

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

interface EditorContextProps {
  config: OGImageConfig
  updateConfig: (config: OGImageConfig) => void
  updateBackground: (background: OGImageConfig['background']) => void
  updateGrid: (grid: OGImageConfig['grid']) => void
}

const EditorContext = createContext<EditorContextProps | undefined>(undefined)

export function useEditor() {
  const context = useContext(EditorContext)
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider')
  }
  return context
}

interface EditorProviderProps {
  children: ReactNode
}

export function EditorProvider({ children }: EditorProviderProps) {
  const [config, setConfig] = useState<OGImageConfig>(defaultConfig)

  const updateConfig = (newConfig: OGImageConfig) => {
    setConfig(newConfig)
  }

  const updateBackground = (background: OGImageConfig['background']) => {
    setConfig(prev => ({
      ...prev,
      background
    }))
  }

  const updateGrid = (grid: OGImageConfig['grid']) => {
    setConfig(prev => ({
      ...prev,
      grid
    }))
  }

  return (
    <EditorContext.Provider
      value={{
        config,
        updateConfig,
        updateBackground,
        updateGrid
      }}
    >
      {children}
    </EditorContext.Provider>
  )
} 