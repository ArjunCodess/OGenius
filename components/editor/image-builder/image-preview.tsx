'use client'

import { useRef } from 'react'
import { OGImageConfig } from '@/types/image-types'
import { generateGradientBackground } from '@/lib/gradient-utils'
import { generateGridPattern, getGridBackgroundSize } from '@/lib/grid-utils'

interface ImagePreviewProps {
  config: OGImageConfig
}

export function ImagePreview({ config }: ImagePreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Style for the preview container based on the current config
  const previewStyle = {
    width: '100%',
    height: '100%',
    aspectRatio: `${config.width} / ${config.height}`,
    background: generateGradientBackground(config.background),
    position: 'relative',
    overflow: 'hidden',
  } as React.CSSProperties

  // Style for the grid pattern overlay
  const gridStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: generateGridPattern(config.grid),
    backgroundSize: getGridBackgroundSize(config.grid),
    opacity: config.grid.opacity / 100, // Set opacity based on configuration
    pointerEvents: 'none',
  } as React.CSSProperties

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-md border">
      <div style={previewStyle} className="mx-auto">
        {/* Grid overlay */}
        {config.grid.type !== 'none' && <div style={gridStyle} />}
        
        {/* Text elements */}
        {config.text?.map((textItem, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${textItem.x}%`,
              top: `${textItem.y}%`,
              color: textItem.color,
              fontFamily: textItem.fontFamily,
              fontSize: `${textItem.fontSize}px`,
              fontWeight: textItem.fontWeight,
              textAlign: textItem.alignment as 'left' | 'center' | 'right',
              transform: 'translate(-50%, -50%)',
            }}
          >
            {textItem.content}
          </div>
        ))}
        
        {/* Image elements */}
        {config.images?.map((imageItem, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: `${imageItem.x}%`,
              top: `${imageItem.y}%`,
              width: `${imageItem.width}px`,
              height: `${imageItem.height}px`,
              backgroundImage: `url(${imageItem.url})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>
    </div>
  )
} 