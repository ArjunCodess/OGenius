import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">OG Image Generator</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/editor">Create Image</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/templates">Templates</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="/community">Community</Link>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
} 