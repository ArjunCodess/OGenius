import { GridSettings } from '@/types/image-types'

/**
 * Generate CSS for grid pattern
 */
export function generateGridPattern(grid: GridSettings): string {
  if (grid.type === 'none') {
    return 'none';
  }

  // We'll apply opacity in the CSS styles instead of in the color
  // to get more visible dots/grid/lines
  const rgbaColor = grid.color

  switch (grid.type) {
    case 'lines':
      return `linear-gradient(to bottom, ${rgbaColor} 1px, transparent 1px)`
    case 'grid':
      return `linear-gradient(to right, ${rgbaColor} 1px, transparent 1px),
              linear-gradient(to bottom, ${rgbaColor} 1px, transparent 1px)`
    case 'dots':
      // Improved dots pattern with better visibility
      return `radial-gradient(circle ${grid.size}px, ${rgbaColor} 0%, ${rgbaColor} 60%, transparent 60%)`
    default:
      return 'none'
  }
}

/**
 * Generate CSS for background-size property based on grid type
 */
export function getGridBackgroundSize(grid: GridSettings): string {
  switch (grid.type) {
    case 'dots':
      return `${grid.spacing * 2}px ${grid.spacing * 2}px`
    case 'grid':
      return `${grid.spacing}px ${grid.spacing}px`
    case 'lines':
      return `100% ${grid.spacing}px`
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
      color: '#FFFFFF',
      opacity: 0,
      size: 1,
      spacing: 20
    },
    {
      type: 'lines',
      color: '#FFFFFF',
      opacity: 50,
      size: 1,
      spacing: 20
    },
    {
      type: 'grid',
      color: '#FFFFFF',
      opacity: 50,
      size: 1,
      spacing: 20
    },
    {
      type: 'dots',
      color: '#FFFFFF',
      opacity: 70,
      size: 2,
      spacing: 20
    }
  ]
} 