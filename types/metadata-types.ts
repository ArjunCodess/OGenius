export interface MetaTag {
  property: string
  content: string
}

export interface OpenGraphMetadata {
  title: string
  description: string
  url?: string
  image: string
  type?: string // website, article, etc.
  siteName?: string
  locale?: string
}

export interface TwitterMetadata {
  title?: string // Will use OG title if not specified
  description?: string // Will use OG description if not specified
  image?: string // Will use OG image if not specified
  card: 'summary' | 'summary_large_image' | 'app' | 'player'
  site?: string // Twitter username
  creator?: string // Twitter username
}

export interface SEOMetadata {
  openGraph: OpenGraphMetadata
  twitter: TwitterMetadata
  additionalTags?: MetaTag[]
} 