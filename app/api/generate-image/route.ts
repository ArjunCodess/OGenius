import { NextResponse } from 'next/server'
import { OGImageConfig } from '@/types/image-types'
import sharp from 'sharp'
import { createCanvas, loadImage } from 'canvas'

// Default config to use when parsing from query params
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

// Parse simplified config from query parameters
function parseConfigFromQuery(queryConfig: string): OGImageConfig {
  try {
    const parsedConfig = JSON.parse(queryConfig);
    
    // Recreate the full config from the simplified version
    const config = structuredClone(defaultConfig);
    
    // Handle the background colors
    if (parsedConfig.bg) {
      if (parsedConfig.bg.includes('-')) {
        // It's a gradient
        const colors = parsedConfig.bg.split('-').map((color: string, index: number) => ({
          color: `#${color}`,
          position: index === 0 ? 0 : 100
        }));
        
        config.background = {
          type: 'linear',
          direction: 'to right',
          colors
        };
      } else {
        // It's a solid color
        config.background = {
          type: 'solid',
          colors: [{ color: `#${parsedConfig.bg}`, position: 0 }]
        };
      }
    }
    
    // Handle grid type
    if (parsedConfig.g) {
      config.grid.type = parsedConfig.g;
    }
    
    // Handle dimensions
    if (parsedConfig.w) config.width = parsedConfig.w;
    if (parsedConfig.h) config.height = parsedConfig.h;
    
    return config;
  } catch (error) {
    console.error('Error parsing config from query:', error);
    return defaultConfig;
  }
}

// Generate image from config
async function generateImage(config: OGImageConfig) {
  // Create a canvas with the specified dimensions
  const canvas = createCanvas(config.width, config.height)
  const ctx = canvas.getContext('2d')

  // Draw background
  if (config.background.type === 'linear') {
    const gradient = ctx.createLinearGradient(
      0,
      0,
      config.width,
      0
    )
    config.background.colors.forEach(({ color, position }) => {
      gradient.addColorStop(position / 100, color)
    })
    ctx.fillStyle = gradient
  } else {
    ctx.fillStyle = config.background.colors[0].color
  }
  ctx.fillRect(0, 0, config.width, config.height)

  // Draw grid if enabled
  if (config.grid.type === 'grid') {
    ctx.strokeStyle = config.grid.color
    ctx.globalAlpha = config.grid.opacity / 100

    // Draw vertical lines
    for (let x = 0; x <= config.width; x += config.grid.size + config.grid.spacing) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, config.height)
      ctx.stroke()
    }

    // Draw horizontal lines
    for (let y = 0; y <= config.height; y += config.grid.size + config.grid.spacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(config.width, y)
      ctx.stroke()
    }

    ctx.globalAlpha = 1
  } else if (config.grid.type === 'lines') {
    // Draw horizontal lines only
    ctx.strokeStyle = config.grid.color
    ctx.globalAlpha = config.grid.opacity / 100
    
    for (let y = 0; y <= config.height; y += config.grid.size + config.grid.spacing) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(config.width, y)
      ctx.stroke()
    }
    
    ctx.globalAlpha = 1
  } else if (config.grid.type === 'dots') {
    // Draw dots in a grid pattern
    ctx.fillStyle = config.grid.color
    ctx.globalAlpha = config.grid.opacity / 100
    
    for (let y = config.grid.spacing; y <= config.height; y += config.grid.spacing * 2) {
      for (let x = config.grid.spacing; x <= config.width; x += config.grid.spacing * 2) {
        ctx.beginPath()
        ctx.arc(x, y, config.grid.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }
    
    ctx.globalAlpha = 1
  }

  // Draw text elements
  for (const text of config.text) {
    ctx.font = `${text.fontSize}px ${text.fontFamily}`
    ctx.fillStyle = text.color
    ctx.textAlign = text.alignment as CanvasTextAlign
    ctx.textBaseline = 'middle'
    ctx.fillText(text.content, text.x, text.y)
  }

  // Draw images
  for (const image of config.images) {
    try {
      const img = await loadImage(image.url)
      ctx.drawImage(img, image.x, image.y, image.width, image.height)
    } catch (error) {
      console.error(`Error loading image: ${image.url}`, error)
    }
  }

  // Convert canvas to buffer
  const buffer = canvas.toBuffer('image/png')

  // Process with sharp for optimization
  const optimizedBuffer = await sharp(buffer)
    .png({ quality: 90 })
    .toBuffer()
    
  return optimizedBuffer
}

// Handle POST requests for generating and downloading images
export async function POST(request: Request) {
  try {
    const config: OGImageConfig = await request.json()
    const imageBuffer = await generateImage(config)

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error generating image:', error)
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    )
  }
}

// Handle GET requests for image previews
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const configParam = searchParams.get('config')
    
    if (!configParam) {
      return NextResponse.json(
        { error: 'No configuration provided' },
        { status: 400 }
      )
    }
    
    const config = parseConfigFromQuery(configParam)
    const imageBuffer = await generateImage(config)

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour for previews
      },
    })
  } catch (error) {
    console.error('Error generating preview image:', error)
    return NextResponse.json(
      { error: 'Failed to generate preview image' },
      { status: 500 }
    )
  }
} 