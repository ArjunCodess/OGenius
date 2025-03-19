"use client"

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'
import { OGImageConfig } from '@/types/image-types'

// ... existing code ...

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

  // ... existing update functions ...

  return (
    <ImageConfigContext.Provider value={{ imageConfig, updateImageConfig, /* other functions */ }}>
      {children}
    </ImageConfigContext.Provider>
  )
} 