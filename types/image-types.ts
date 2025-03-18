export type GradientType = 'linear' | 'radial' | 'conic' | 'solid'

export type GradientDirection = 
  | 'to right'
  | 'to left'
  | 'to bottom'
  | 'to top'
  | 'to bottom right'
  | 'to bottom left'
  | 'to top right'
  | 'to top left'

export type GridType = 'none' | 'lines' | 'dots' | 'grid'

export type TextAlignment = 'left' | 'center' | 'right'

export interface ColorStop {
  color: string
  position: number // 0-100
}

export interface GradientSettings {
  type: GradientType
  direction?: GradientDirection
  colors: ColorStop[]
}

export interface GridSettings {
  type: GridType
  color: string
  opacity: number // 0-100
  size: number
  spacing: number
}

export interface TextSettings {
  content: string
  fontFamily: string
  fontSize: number
  fontWeight: string
  color: string
  alignment: TextAlignment
  x: number
  y: number
}

export interface ImageSettings {
  url: string
  width: number
  height: number
  x: number
  y: number
}

export interface OGImageConfig {
  width: number
  height: number
  background: GradientSettings
  grid: GridSettings
  text: TextSettings[]
  images: ImageSettings[]
}

export interface Template {
  id: string
  name: string
  description: string
  config: OGImageConfig
} 