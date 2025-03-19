import { MetaTag, OpenGraphMetadata, SEOMetadata, TwitterMetadata } from '@/types/metadata-types'
import { OGImageConfig } from '@/types/image-types'

/**
 * Generates Open Graph meta tags from the provided metadata
 */
export function generateOpenGraphTags(og: OpenGraphMetadata): MetaTag[] {
  const tags: MetaTag[] = [
    { property: 'og:title', content: og.title },
    { property: 'og:description', content: og.description },
    { property: 'og:image', content: og.image },
  ]

  if (og.url) {
    tags.push({ property: 'og:url', content: og.url })
  }

  if (og.type) {
    tags.push({ property: 'og:type', content: og.type })
  } else {
    tags.push({ property: 'og:type', content: 'website' })
  }

  if (og.siteName) {
    tags.push({ property: 'og:site_name', content: og.siteName })
  }

  if (og.locale) {
    tags.push({ property: 'og:locale', content: og.locale })
  }

  return tags
}

/**
 * Generates Twitter meta tags from the provided metadata
 */
export function generateTwitterTags(twitter: TwitterMetadata, og: OpenGraphMetadata): MetaTag[] {
  const tags: MetaTag[] = [
    { property: 'twitter:card', content: twitter.card },
    { property: 'twitter:title', content: twitter.title || og.title },
    { property: 'twitter:description', content: twitter.description || og.description },
    { property: 'twitter:image', content: twitter.image || og.image },
  ]

  if (twitter.site) {
    tags.push({ property: 'twitter:site', content: twitter.site })
  }

  if (twitter.creator) {
    tags.push({ property: 'twitter:creator', content: twitter.creator })
  }

  return tags
}

/**
 * Generates all SEO meta tags from the provided metadata
 */
export function generateMetaTags(metadata: SEOMetadata): MetaTag[] {
  const ogTags = generateOpenGraphTags(metadata.openGraph)
  const twitterTags = generateTwitterTags(metadata.twitter, metadata.openGraph)
  
  let allTags = [...ogTags, ...twitterTags]
  
  if (metadata.additionalTags) {
    allTags = [...allTags, ...metadata.additionalTags]
  }
  
  return allTags
}

/**
 * Get the base URL of the current website
 */
export function getBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Browser environment
    return window.location.origin;
  }
  
  // Server environment
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL 
    || process.env.VERCEL_URL 
    || 'http://localhost:3000';
    
  // If it's a Vercel URL, ensure it has https
  if (baseUrl.includes('vercel.app')) {
    return `https://${baseUrl}`;
  }
  
  // For local development, use http
  return baseUrl.startsWith('http') ? baseUrl : `http://${baseUrl}`;
}

/**
 * Converts an OGImageConfig to a URL for the API endpoint
 */
export function getImageUrlFromConfig(config: OGImageConfig): string {
  // Create a URL with the configuration as a query parameter
  // This ensures we can generate a real-time preview of the image
  
  // Simplify the config to keep the URL shorter
  const simplifiedConfig = {
    bg: config.background.type === 'linear' ? 
      config.background.colors.map(c => c.color.replace('#', '')).join('-') : 
      config.background.colors[0].color.replace('#', ''),
    g: config.grid.type,
    w: config.width,
    h: config.height
  }
  
  // Get the base URL of the website
  const baseUrl = getBaseUrl();
  
  // Generate the full absolute URL to our API endpoint
  return `${baseUrl}/api/generate-image?config=${encodeURIComponent(JSON.stringify(simplifiedConfig))}`
}

/**
 * Links the OG image configuration with the metadata by updating the image URLs
 */
export function linkImageConfigToMetadata(metadata: SEOMetadata, config: OGImageConfig): SEOMetadata {
  const imageUrl = getImageUrlFromConfig(config)
  
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      image: imageUrl,
    },
    twitter: {
      ...metadata.twitter,
      image: imageUrl, // Always use the current image config
    },
  }
} 