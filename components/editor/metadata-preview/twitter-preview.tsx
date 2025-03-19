import React from 'react'
import { TwitterMetadata } from '@/types/metadata-types'
import Image from 'next/image'
import { Play, ExternalLink, Star } from 'lucide-react'

interface TwitterPreviewProps {
  metadata: TwitterMetadata
  fallbackTitle: string
  fallbackDescription: string
  fallbackImage: string
}

export default function TwitterPreview({ 
  metadata, 
  fallbackTitle, 
  fallbackDescription, 
  fallbackImage 
}: TwitterPreviewProps) {
  const title = metadata.title || fallbackTitle
  const description = metadata.description || fallbackDescription
  const image = metadata.image || fallbackImage
  
  // Common components
  const SiteInfo = () => metadata.site && (
    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
      {metadata.site.startsWith('@') ? metadata.site : `@${metadata.site}`}
    </p>
  )

  const CardTitle = () => (
    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
      {title}
    </h3>
  )

  const CardDescription = ({ appendText, maxLength }: { appendText?: string, maxLength?: number }) => (
    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
      {maxLength ? description.substring(0, maxLength) + '...' : description}
      {appendText && <span className="text-blue-500"> {appendText}</span>}
    </p>
  )

  const CardImage = ({ 
    containerClassName, 
    imageClassName = "object-cover", 
    width = undefined, 
    height = undefined, 
    fill = true, 
    placeholder = "No image", 
    imgOpacity = ""
  }: { 
    containerClassName: string, 
    imageClassName?: string, 
    width?: number, 
    height?: number, 
    fill?: boolean, 
    placeholder?: string,
    imgOpacity?: string
  }) => (
    <div className={containerClassName}>
      {image ? (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-700 relative">
          <Image
            src={image}
            alt={title}
            width={width}
            height={height}
            fill={fill}
            className={`${imageClassName} ${imgOpacity}`}
            onError={(e) => {
              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGMkYyRjIiIGQ9Ik0wIDBoMTIwdjEyMEgweiIvPjxwYXRoIGQ9Ik01NC44NjQgODMuOTc4YTIuMDg1IDIuMDg1IDAgMDEtMS44MzYgMS4wOThoLTIuMjE2di00LjIyOWgyLjIxNmMuNzc5IDAgMS41MDMuNDY1IDEuODM2IDEuMTY4LjE3NS4zODYuMjMxLjgzMy4yOTMgMS4yNjQuMDYuNDMuMDYuNzY4LS4yOTMgMS4wOTlNNjQuOTk2IDc2LjQ4MmMuNzc5IDAgMS41MDMuNDY1IDEuODM2IDEuMTY4LjE3NS4zODYuMjMxLjgzMy4yOTMgMS4yNjQuMDYyLjQzLjA0OC43OTgtLjI5MyAxLjA5OGEyLjA4NSAyLjA4NSAwIDAxLTEuODM2IDEuMDk4aC0yLjIxNnYtNC42Mjh6TTY5LjIzNCA4NGEuODc5Ljg3OSAwIDAxLS44NzktLjg3NXYtNS42MjdhLjg3OS44NzkgMCAwMS44NzktLjg3NWguMDAxYS44NzkuODc5IDAgMDEuODc5Ljg3NXY1LjYyN2EuODc5Ljg3OSAwIDAxLS44Ny44NzVoLS4wMXpNNzQuNDQzIDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aC4wMDFhLjg3OS44NzkgMCAwMS44NzkuODc1djUuNjI3YS44NzkuODc5IDAgMDEtLjg4Ljg3NXpNNzcuMDM3IDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aDQuMTk0YS44NzkuODc5IDAgMDEwIDEuNzVoLTMuMzE1djQuNzUyYS44NzkuODc5IDAgMDEtLjg3OS44NzVNODYuNjAzIDc4LjM3M2EuODguODggMCAwMS0uODgtLjg3NS44NzkuODc5IDAgMDEuODgtLjg3NWgzLjA3MnYtLjI1YS44NzguODc4IDAgMDEuODc5LS44NzVoLjAwMmEuODc4Ljg3OCAwIDAxLjg3OS44NzV2My41YzAgLjg0LS4xNiAxLjU0Ny0uNDc2IDIuMDk3LS4zMTcuNTQ5LS44MjMuOTc4LTEuNDk0IDEuMjY1YS42MjguNjI4IDAgMDEtLjI1LjA1Mi42MjkuNjI5IDAgMDEtLjU3Ni0uMzc1LjYyLjYyIDAgMDEuMzI1LS44MjNjLjQzNi0uMTg3Ljc1NC0uNDQxLjk0LS43NDMuMTg0LS4zMDIuMjcyLS43NC4yNzItMS4zMjF2LTEuNjI3aC0yLjY3M3pNNDMuNzQxIDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aDQuMTk0YS44NzkuODc5IDAgMDEwIDEuNzVoLTMuMzE1djQuNzUyYS44NzkuODc5IDAgMDEtLjg3OS44NzVNNDAuMjY0IDc4LjM3M2gtLjAwMWEuODc5Ljg3OSAwIDAxLS44NzktLjg3NXYtLjEyNWEuODc5Ljg3OSAwIDAxLjg3OS0uODc1aC45NTdhLjg3OS44NzkgMCAwMS44NzkuODc1di4xMjVhLjg3OS44NzkgMCAwMS0uODc5Ljg3NWgtLjk1NnpNMjcuNjUyIDg0YS44NzkuODc5IDAgMDEtLjg3OC0uODc1di0xLjc1MWgtMy4zMTVhLjg3OS44NzkgMCAwMTAtMS43NWg0LjE5NGEuODc5Ljg3OSAwIDAxLjg3OS44NzV2Mi42MjZhLjg3OC44NzggMCAwMS0uODguODc1TTI5LjQxIDc3Ljc0OGEuODguODggMCAwMS0uNjIyLS4yNTguODczLjg3MyAwIDAxMC0xLjIzNGMuMzQzLS4zNDIuOS0uMzQyIDEuMjQ0IDBhLjg3My44NzMgMCAwMTAgMS4yMzQuODguODggMCAwMS0uNjIyLjI1OE00MC4yNjQgODRoLS4wMDFhLjg3OS44NzkgMCAwMS0uODc5LS44NzVWODAuNWEuODc5Ljg3OSAwIDAxLjg3OS0uODc1aC45NTdhLjg3OS44NzkgMCAwMS44NzkuODc1djIuNjI1YS44NzkuODc5IDAgMDEtLjg3OS44NzVoLS45NTZ6TTMzLjk5NSA4NGEuODc5Ljg3OSAwIDAxLS44NzktLjg3NXYtMi42MjZhLjg3OC44NzggMCAwMS44NzktLjg3NGg0LjE5NGEuODc4Ljg3OCAwIDAxMCAxLjc1aC0zLjMxNXYxLjc1QS44NzkuODc5IDAgMDEzMy45OTUgODRNNjEuODU3IDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aDMuMTM5YzEuMzk2IDAgMi41MzIgMS4xMzIgMi41MzIgMi41di4yNWMwIDEuMDY3LS42NyAxLjk3NS0xLjYxNiAyLjMzMi45NDYuMzU2IDEuNjE2IDEuMjY0IDEuNjE2IDIuMzMydi4wNjNhLjg3OS44NzkgMCAwMS0uODc5Ljg3NS4wMDYuMDA2IDAgMDEtLjAwMSAwIC44OC44OCAwIDAxLS44NzktLjg3NXYtLjA2M2MwLS40NjYtLjM4LS44NDQtLjg0OS0uODQ0aC0yLjE4NHYuOTgyYS44NzkuODc5IDAgMDEtLjg3OS44NzVNNTAuODkgODRhLjg3OS44NzkgMCAwMS0uODc5LS44NzV2LTUuNjI3YS44NzkuODc5IDAgMDEuODc5LS44NzVoMy4xMzljMS4zOTYgMCAyLjUzMyAxLjEzMiAyLjUzMyAyLjVzLTEuMTM3IDIuNS0yLjUzMyAyLjVoLTIuMjU5di4zMDJhMS4yOTMgMS4yOTMgMCAwMS0uODc5IDEuMjIydi44NTNBMS45MTYgMS45MTYgMCAwMDUyLjggODRoLjAwMWEuODc5Ljg3OSAwIDAxMCAxLjc1QTMuNjcgMy42NyAwIDAxNDkuMTMyIDg0aC0uMDQzYy0uNDg2IDAtLjg4LS4zOTMtLjg4LS44NzVWODRoMi42ODF6IiBmaWxsPSIjQkZCRkJGIi8+PC9nPjwvc3ZnPg=='
            }}
          />
        </div>
      ) : (
        <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
          <span className="text-xs text-slate-400 dark:text-slate-500">{placeholder}</span>
        </div>
      )}
    </div>
  )

  // Card footer with type label
  const CardFooter = () => (
    <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700 flex items-center">
      <span className="text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 rounded mr-2">
        {metadata.card}
      </span>
      <span className="text-xs text-slate-500">Twitter Card Type</span>
    </div>
  )

  // Determine which card type to render
  const renderCard = () => {
    switch (metadata.card) {
      case 'summary_large_image':
        return (
          <>
            <CardImage 
              containerClassName="relative w-full h-48" 
              placeholder="No image provided" 
            />
            <div className="p-4">
              <CardTitle />
              <CardDescription />
              <SiteInfo />
            </div>
          </>
        );
        
      case 'player':
        return (
          <>
            <div className="relative w-full h-48 bg-black flex items-center justify-center">
              {image ? (
                <div className="w-full h-full relative">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover opacity-70"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMxMTExMTEiIGQ9Ik0wIDBoMTIwdjEyMEgweiIvPjwvZz48L3N2Zz4='
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/30 rounded-full p-3 backdrop-blur-sm">
                      <Play className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <Play className="h-10 w-10 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-400">Media player</span>
                </div>
              )}
            </div>
            <div className="p-4">
              <CardTitle />
              <CardDescription appendText="Watch now" />
              <SiteInfo />
            </div>
          </>
        );
        
      case 'app':
        return (
          <>
            <div className="p-4">
              <div className="flex mb-3">
                <div className="w-16 h-16 rounded-xl overflow-hidden mr-3 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                  {image ? (
                    <Image
                      src={image}
                      alt={title}
                      width={64}
                      height={64}
                      className="object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGMkYyRjIiIGQ9Ik0wIDBoMTIwdjEyMEgweiIvPjwvZz48L3N2Zz4='
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <span className="text-xs text-slate-400 dark:text-slate-500">App icon</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle />
                  <CardDescription maxLength={60} />
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {[1, 2, 3, 4, 5].map((n) => (
                        <Star key={n} className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500">Free</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-2">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <span className="inline-block text-xs text-white bg-blue-500 rounded-full px-2 py-0.5">
                      DOWNLOAD
                    </span>
                  </div>
                  <SiteInfo />
                </div>
              </div>
            </div>
          </>
        );
        
      case 'summary':
      default:
        return (
          <div className="flex p-4">
            <div className="flex-1 pr-3">
              <CardTitle />
              <CardDescription />
              <SiteInfo />
            </div>
            <CardImage 
              containerClassName="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden" 
              placeholder="No image"
            />
          </div>
        );
    }
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <div className="bg-white dark:bg-slate-800 flex flex-col">
        {renderCard()}
        <CardFooter />
      </div>
    </div>
  )
} 