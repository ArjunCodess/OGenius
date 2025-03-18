'use client'

import { useRef } from 'react'
import { useEditor } from '@/context/editor-context'
import { generateGradientBackground } from '@/lib/gradient-utils'
import { generateGridPattern, getGridBackgroundSize } from '@/lib/grid-utils'

export function ImagePreview() {
  const { config } = useEditor()
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
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: generateGridPattern(config.grid),
    backgroundSize: getGridBackgroundSize(config.grid),
    pointerEvents: 'none',
  } as React.CSSProperties

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-md border">
      <div style={previewStyle} className="mx-auto">
        {/* Grid overlay */}
        <div style={gridStyle} />
        
        {/* Text elements */}
        {config.text.map((textItem, index) => (
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
              textAlign: textItem.alignment,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {textItem.content}
          </div>
        ))}
        
        {/* Image elements */}
        {config.images.map((imageItem, index) => (
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