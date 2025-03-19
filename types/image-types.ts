export type GridType = 'none' | 'lines' | 'grid' | 'dots'

export interface GridSettings {
  type: GridType
  color: string
  opacity: number
  size: number
  spacing: number
}

export interface GradientColor {
  color: string
  position: number
}

export interface GradientSettings {
  type: 'linear' | 'solid'
  direction?: string
  colors: GradientColor[]
}

export interface TextSettings {
  content: string
  x: number
  y: number
  color: string
  fontFamily: string
  fontSize: number
  fontWeight: number
  alignment: string
}

export interface ImageSettings {
  url: string
  x: number
  y: number
  width: number
  height: number
}

export interface OGImageConfig {
  width: number
  height: number
  background: GradientSettings
  grid: GridSettings
  text: TextSettings[]
  images: ImageSettings[]
} 