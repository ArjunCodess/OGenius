import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function TemplatesPage() {
  // This is a placeholder for actual template data that will be implemented later
  const templates = [
    { id: 'blog', name: 'Blog Post', description: 'Perfect for blog articles and written content.' },
    { id: 'product', name: 'Product', description: 'Showcase your products with this template.' },
    { id: 'personal', name: 'Personal', description: 'Great for personal websites and profiles.' },
    { id: 'corporate', name: 'Corporate', description: 'Professional template for business websites.' },
    { id: 'event', name: 'Event', description: 'Promote your events with this eye-catching template.' },
    { id: 'minimal', name: 'Minimal', description: 'Clean and simple design for any purpose.' },
  ]

  return (
    <div className="flex flex-col gap-8 py-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <p className="text-muted-foreground">
          Choose a template to get started with your OG image.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-[1200/630] bg-muted rounded-md flex items-center justify-center border mb-4">
                <p className="text-sm text-muted-foreground">{template.name} Preview</p>
              </div>
              <p className="text-sm text-muted-foreground">{template.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/editor?template=${template.id}`}>
                  Use Template
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 