import { GridSettings } from '@/types/image-types'

/**
 * Generate CSS for grid pattern
 */
export function generateGridPattern(settings: GridSettings): string {
  const { type, color, opacity, size, spacing } = settings
  
  // Convert opacity from 0-100 to 0-1
  const opacityValue = opacity / 100
  const rgbaColor = convertToRgba(color, opacityValue)
  
  switch (type) {
    case 'lines':
      return `repeating-linear-gradient(0deg, transparent, transparent ${spacing - 1}px, ${rgbaColor} ${spacing - 1}px, ${rgbaColor} ${spacing}px)`
    case 'grid':
      return `linear-gradient(0deg, transparent, transparent ${spacing - 1}px, ${rgbaColor} ${spacing - 1}px, ${rgbaColor} ${spacing}px),
              linear-gradient(90deg, transparent, transparent ${spacing - 1}px, ${rgbaColor} ${spacing - 1}px, ${rgbaColor} ${spacing}px)`
    case 'dots':
      return `radial-gradient(circle ${size}px at ${spacing}px ${spacing}px, ${rgbaColor} 99%, transparent 100%)`
    case 'none':
    default:
      return 'none'
  }
}

/**
 * Convert hex color to rgba for opacity support
 */
export function convertToRgba(hexColor: string, opacity: number): string {
  // Remove # if present
  const hex = hexColor.replace('#', '')
  
  // Convert hex to RGB
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  
  // Return rgba value
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

/**
 * Generate CSS for background-size property based on grid type
 */
export function getGridBackgroundSize(settings: GridSettings): string {
  const { type, spacing } = settings
  
  switch (type) {
    case 'dots':
      return `${spacing * 2}px ${spacing * 2}px`
    case 'grid':
    case 'lines':
      return '100% 100%'
    case 'none':
    default:
      return 'auto'
  }
}

/**
 * Generate preset grid settings options
 */
export function getGridPresets(): GridSettings[] {
  return [
    {
      type: 'none',
      color: '#000000',
      opacity: 0,
      size: 1,
      spacing: 20
    },
    {
      type: 'lines',
      color: '#000000',
      opacity: 20,
      size: 1,
      spacing: 20
    },
    {
      type: 'grid',
      color: '#000000',
      opacity: 20,
      size: 1,
      spacing: 20
    },
    {
      type: 'dots',
      color: '#000000',
      opacity: 40,
      size: 3,
      spacing: 20
    }
  ]
} 