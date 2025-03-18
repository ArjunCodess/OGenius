import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col gap-12 py-8">
      <section className="flex flex-col items-center text-center gap-4 py-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Create stunning Open Graph images
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl">
          Design beautiful social media cards and meta images with our easy-to-use editor.
          No design skills required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <Button asChild size="lg">
            <Link href="/editor">Create Your First Image</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/templates">Browse Templates</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Customizable Templates</CardTitle>
            <CardDescription>
              Choose from a variety of professional templates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Start with a beautiful template and customize it to match your brand. Adjust colors, typography, and layout with ease.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/templates">Browse Templates</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Advanced Editor</CardTitle>
            <CardDescription>
              Powerful yet simple editing tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Our intuitive editor lets you customize every aspect of your image. Add gradients, patterns, text, and your own images with ease.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/editor">Try the Editor</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Meta Tag Generator</CardTitle>
            <CardDescription>
              Generate the perfect meta tags.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>We&apos;ll help you create the proper meta tags for Facebook, Twitter, and other platforms to ensure your content looks great when shared.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline">
              <Link href="/editor">Generate Meta Tags</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  )
}
