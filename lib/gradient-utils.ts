import { GradientSettings, OGImageConfig } from '@/types/image-types'

/**
 * Generate CSS string for linear gradient
 */
export function generateLinearGradient(settings: GradientSettings): string {
  const { direction = 'to right', colors } = settings
  
  const colorStops = colors
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(', ')
  
  return `linear-gradient(${direction}, ${colorStops})`
}

/**
 * Generate CSS string for radial gradient
 */
export function generateRadialGradient(settings: GradientSettings): string {
  const { colors } = settings
  
  const colorStops = colors
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(', ')
  
  return `radial-gradient(circle, ${colorStops})`
}

/**
 * Generate CSS string for conic gradient
 */
export function generateConicGradient(settings: GradientSettings): string {
  const { colors } = settings
  
  const colorStops = colors
    .map((stop) => `${stop.color} ${stop.position}%`)
    .join(', ')
  
  return `conic-gradient(from 0deg, ${colorStops})`
}

/**
 * Generate CSS string for solid color (single color gradient)
 */
export function generateSolidColor(settings: GradientSettings): string {
  // For solid color, just use the first color
  return settings.colors[0]?.color || '#ffffff'
}

/**
 * Generate CSS background value based on gradient settings
 */
export function generateGradientBackground(background: OGImageConfig['background']): string {
  if (background.type === 'solid') {
    return background.colors[0].color || '#000000'
  }

  if (background.type === 'linear') {
    const direction = background.direction || 'to right'
    const colorStops = background.colors
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ')
    
    return `linear-gradient(${direction}, ${colorStops})`
  }

  return '#000000' // Default fallback
}

/**
 * Generate preset gradients for quick selection
 */
export function getGradientPresets(): GradientSettings[] {
  return [
    // Linear gradients
    {
      type: 'linear',
      direction: 'to right',
      colors: [
        { color: '#4f46e5', position: 0 },
        { color: '#7c3aed', position: 100 }
      ],
    },
    {
      type: 'linear',
      direction: 'to bottom right',
      colors: [
        { color: '#2dd4bf', position: 0 },
        { color: '#0ea5e9', position: 100 }
      ],
    },
    {
      type: 'linear',
      direction: 'to bottom',
      colors: [
        { color: '#84cc16', position: 0 },
        { color: '#22c55e', position: 100 }
      ],
    },
    {
      type: 'linear',
      direction: 'to bottom left',
      colors: [
        { color: '#ec4899', position: 0 },
        { color: '#8b5cf6', position: 100 }
      ],
    },
    
    // Radial gradients
    {
      type: 'radial',
      colors: [
        { color: '#fbbf24', position: 0 },
        { color: '#ef4444', position: 100 }
      ],
    },
    
    // Conic gradients
    {
      type: 'conic',
      colors: [
        { color: '#ec4899', position: 0 },
        { color: '#8b5cf6', position: 33 },
        { color: '#3b82f6', position: 66 },
        { color: '#ec4899', position: 100 }
      ],
    },
    {
      type: 'conic',
      colors: [
        { color: '#22c55e', position: 0 },
        { color: '#84cc16', position: 33 },
        { color: '#eab308', position: 66 },
        { color: '#22c55e', position: 100 }
      ],
    },
    
    // Solid colors
    {
      type: 'solid',
      colors: [
        { color: '#18181b', position: 0 }
      ],
    },
    {
      type: 'solid',
      colors: [
        { color: '#0f172a', position: 0 }
      ],
    },
    {
      type: 'solid',
      colors: [
        { color: '#881337', position: 0 }
      ],
    },
  ]
}

export const gradientPresets = [
  // Blues to purples
  ['#4F46E5', '#7C3AED'],
  // Reds to oranges
  ['#EF4444', '#F97316'],
  // Greens to blues
  ['#10B981', '#3B82F6'],
  // Oranges to pinks
  ['#F97316', '#EC4899'],
  // Purples to pinks
  ['#8B5CF6', '#EC4899'],
  // Blues to cyans
  ['#3B82F6', '#06B6D4'],
  // Dark theme
  ['#1F2937', '#111827'],
  // Light theme
  ['#F3F4F6', '#E5E7EB'],
] 