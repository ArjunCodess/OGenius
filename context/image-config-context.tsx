"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { OGImageConfig } from '@/types/image-types'

// Default config
const defaultImageConfig: OGImageConfig = {
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

// Create context with default values
interface ImageConfigContextType {
  imageConfig: OGImageConfig;
  updateImageConfig: (newConfig: Partial<OGImageConfig>) => void;
}

const ImageConfigContext = createContext<ImageConfigContextType>({
  imageConfig: defaultImageConfig,
  updateImageConfig: () => {}
});

// Custom hook to use the image config context
export function useImageConfig() {
  return useContext(ImageConfigContext);
}

export function ImageConfigProvider({ children }: { children: ReactNode }) {
  const [imageConfig, setImageConfig] = useState<OGImageConfig>(defaultImageConfig)
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Load image config from localStorage on initial render
  useEffect(() => {
    try {
      const savedConfig = localStorage.getItem('og-image-config')
      if (savedConfig) {
        setImageConfig(JSON.parse(savedConfig))
      }
      setIsLoaded(true)
    } catch (error) {
      console.error('Failed to load image config from localStorage:', error)
      setIsLoaded(true)
    }
  }, [])
  
  // Save image config to localStorage whenever it changes
  useEffect(() => {
    if (!isLoaded) return
    
    try {
      localStorage.setItem('og-image-config', JSON.stringify(imageConfig))
    } catch (error) {
      console.error('Failed to save image config to localStorage:', error)
    }
  }, [imageConfig, isLoaded])

  const updateImageConfig = (newConfig: Partial<OGImageConfig>) => {
    setImageConfig(prev => ({ ...prev, ...newConfig }))
  }

  return (
    <ImageConfigContext.Provider value={{ imageConfig, updateImageConfig }}>
      {children}
    </ImageConfigContext.Provider>
  )
} 