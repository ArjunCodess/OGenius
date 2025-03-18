import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: ReactNode
  className?: string
  containerClassName?: string
}

export function MainLayout({
  children,
  className,
  containerClassName,
}: MainLayoutProps) {
  return (
    <div className={cn('min-h-[calc(100vh-120px)] bg-background', className)}>
      <div className={cn('container mx-auto px-4 md:px-6', containerClassName)}>
        {children}
      </div>
    </div>
  )
}