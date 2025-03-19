import React from 'react'
import { OpenGraphMetadata } from '@/types/metadata-types'
import Image from 'next/image'

interface OpenGraphPreviewProps {
  metadata: OpenGraphMetadata
}

export default function OpenGraphPreview({ metadata }: OpenGraphPreviewProps) {
  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <div className="bg-white dark:bg-slate-800 p-4">
        <div className="flex items-start space-x-4">
          <div className="flex-1 min-w-0">
            {metadata.siteName && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1 truncate">
                {metadata.siteName}
              </p>
            )}
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
              {metadata.title}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
              {metadata.description}
            </p>
            {metadata.url && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">
                {metadata.url.replace(/^https?:\/\//, '')}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="relative w-full h-48">
        {metadata.image ? (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-700 relative">
            <Image
              src={metadata.image}
              alt={metadata.title}
              fill
              className="object-cover"
              onError={(e) => {
                // Show placeholder on error
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiNGMkYyRjIiIGQ9Ik0wIDBoMTIwdjEyMEgweiIvPjxwYXRoIGQ9Ik01NC44NjQgODMuOTc4YTIuMDg1IDIuMDg1IDAgMDEtMS44MzYgMS4wOThoLTIuMjE2di00LjIyOWgyLjIxNmMuNzc5IDAgMS41MDMuNDY1IDEuODM2IDEuMTY4LjE3NS4zODYuMjMxLjgzMy4yOTMgMS4yNjQuMDYuNDMuMDYuNzY4LS4yOTMgMS4wOTlNNjQuOTk2IDc2LjQ4MmMuNzc5IDAgMS41MDMuNDY1IDEuODM2IDEuMTY4LjE3NS4zODYuMjMxLjgzMy4yOTMgMS4yNjQuMDYyLjQzLjA0OC43OTgtLjI5MyAxLjA5OGEyLjA4NSAyLjA4NSAwIDAxLTEuODM2IDEuMDk4aC0yLjIxNnYtNC42Mjh6TTY5LjIzNCA4NGEuODc5Ljg3OSAwIDAxLS44NzktLjg3NXYtNS42MjdhLjg3OS44NzkgMCAwMS44NzktLjg3NWguMDAxYS44NzkuODc5IDAgMDEuODc5Ljg3NXY1LjYyN2EuODc5Ljg3OSAwIDAxLS44Ny44NzVoLS4wMXpNNzQuNDQzIDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aC4wMDFhLjg3OS44NzkgMCAwMS44NzkuODc1djUuNjI3YS44NzkuODc5IDAgMDEtLjg4Ljg3NXpNNzcuMDM3IDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aDQuMTk0YS44NzkuODc5IDAgMDEwIDEuNzVoLTMuMzE1djQuNzUyYS44NzkuODc5IDAgMDEtLjg3OS44NzVNODYuNjAzIDc4LjM3M2EuODguODggMCAwMS0uODgtLjg3NS44NzkuODc5IDAgMDEuODgtLjg3NWgzLjA3MnYtLjI1YS44NzguODc4IDAgMDEuODc5LS44NzVoLjAwMmEuODc4Ljg3OCAwIDAxLjg3OS44NzV2My41YzAgLjg0LS4xNiAxLjU0Ny0uNDc2IDIuMDk3LS4zMTcuNTQ5LS44MjMuOTc4LTEuNDk0IDEuMjY1YS42MjguNjI4IDAgMDEtLjI1LjA1Mi42MjkuNjI5IDAgMDEtLjU3Ni0uMzc1LjYyLjYyIDAgMDEuMzI1LS44MjNjLjQzNi0uMTg3Ljc1NC0uNDQxLjk0LS43NDMuMTg0LS4zMDIuMjcyLS43NC4yNzItMS4zMjF2LTEuNjI3aC0yLjY3M3pNNDMuNzQxIDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aDQuMTk0YS44NzkuODc5IDAgMDEwIDEuNzVoLTMuMzE1djQuNzUyYS44NzkuODc5IDAgMDEtLjg3OS44NzVNNDAuMjY0IDc4LjM3M2gtLjAwMWEuODc5Ljg3OSAwIDAxLS44NzktLjg3NXYtLjEyNWEuODc5Ljg3OSAwIDAxLjg3OS0uODc1aC45NTdhLjg3OS44NzkgMCAwMS44NzkuODc1di4xMjVhLjg3OS44NzkgMCAwMS0uODc5Ljg3NWgtLjk1NnpNMjcuNjUyIDg0YS44NzkuODc5IDAgMDEtLjg3OC0uODc1di0xLjc1MWgtMy4zMTVhLjg3OS44NzkgMCAwMTAtMS43NWg0LjE5NGEuODc5Ljg3OSAwIDAxLjg3OS44NzV2Mi42MjZhLjg3OC44NzggMCAwMS0uODguODc1TTI5LjQxIDc3Ljc0OGEuODguODggMCAwMS0uNjIyLS4yNTguODczLjg3MyAwIDAxMC0xLjIzNGMuMzQzLS4zNDIuOS0uMzQyIDEuMjQ0IDBhLjg3My44NzMgMCAwMTAgMS4yMzQuODguODggMCAwMS0uNjIyLjI1OE00MC4yNjQgODRoLS4wMDFhLjg3OS44NzkgMCAwMS0uODc5LS44NzVWODAuNWEuODc5Ljg3OSAwIDAxLjg3OS0uODc1aC45NTdhLjg3OS44NzkgMCAwMS44NzkuODc1djIuNjI1YS44NzkuODc5IDAgMDEtLjg3OS44NzVoLS45NTZ6TTMzLjk5NSA4NGEuODc5Ljg3OSAwIDAxLS44NzktLjg3NXYtMi42MjZhLjg3OC44NzggMCAwMS44NzktLjg3NGg0LjE5NGEuODc4Ljg3OCAwIDAxMCAxLjc1aC0zLjMxNXYxLjc1QS44NzkuODc5IDAgMDEzMy45OTUgODRNNjEuODU3IDg0YS44NzkuODc5IDAgMDEtLjg3OS0uODc1di01LjYyN2EuODc5Ljg3OSAwIDAxLjg3OS0uODc1aDMuMTM5YzEuMzk2IDAgMi41MzIgMS4xMzIgMi41MzIgMi41di4yNWMwIDEuMDY3LS42NyAxLjk3NS0xLjYxNiAyLjMzMi45NDYuMzU2IDEuNjE2IDEuMjY0IDEuNjE2IDIuMzMydi4wNjNhLjg3OS44NzkgMCAwMS0uODc5Ljg3NS4wMDYuMDA2IDAgMDEtLjAwMSAwIC44OC44OCAwIDAxLS44NzktLjg3NXYtLjA2M2MwLS40NjYtLjM4LS44NDQtLjg0OS0uODQ0aC0yLjE4NHYuOTgyYS44NzkuODc5IDAgMDEtLjg3OS44NzVNNTAuODkgODRhLjg3OS44NzkgMCAwMS0uODc5LS44NzV2LTUuNjI3YS44NzkuODc5IDAgMDEuODc5LS44NzVoMy4xMzljMS4zOTYgMCAyLjUzMyAxLjEzMiAyLjUzMyAyLjVzLTEuMTM3IDIuNS0yLjUzMyAyLjVoLTIuMjU5di4zMDJhMS4yOTMgMS4yOTMgMCAwMS0uODc5IDEuMjIydi44NTNBMS45MTYgMS45MTYgMCAwMDUyLjggODRoLjAwMWEuODc5Ljg3OSAwIDAxMCAxLjc1QTMuNjcgMy42NyAwIDAxNDkuMTMyIDg0aC0uMDQzYy0uNDg2IDAtLjg4LS4zOTMtLjg4LS44NzVWODRoMi42ODF6IiBmaWxsPSIjQkZCRkJGIi8+PC9nPjwvc3ZnPg=='
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
            <span className="text-sm text-slate-400 dark:text-slate-500">No image provided</span>
          </div>
        )}
      </div>
    </div>
  )
} 