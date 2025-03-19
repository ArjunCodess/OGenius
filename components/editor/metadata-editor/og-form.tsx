import React from 'react'
import { OpenGraphMetadata } from '@/types/metadata-types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface OpenGraphFormProps {
  openGraph: OpenGraphMetadata
  onChange: (openGraph: OpenGraphMetadata) => void
}

export default function OpenGraphForm({ openGraph, onChange }: OpenGraphFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({
      ...openGraph,
      [name]: value,
    })
  }

  const handleTypeChange = (value: string) => {
    onChange({
      ...openGraph,
      type: value,
    })
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={openGraph.title}
          onChange={handleInputChange}
          placeholder="Page title"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={openGraph.description}
          onChange={handleInputChange}
          placeholder="Brief description of the page content"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={openGraph.image}
          onChange={handleInputChange}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="url">URL (optional)</Label>
        <Input
          id="url"
          name="url"
          value={openGraph.url || ''}
          onChange={handleInputChange}
          placeholder="https://example.com/page"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="type">Type</Label>
        <Select
          value={openGraph.type || 'website'}
          onValueChange={handleTypeChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="article">Article</SelectItem>
            <SelectItem value="book">Book</SelectItem>
            <SelectItem value="profile">Profile</SelectItem>
            <SelectItem value="video.movie">Movie</SelectItem>
            <SelectItem value="music.song">Song</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="siteName">Site Name (optional)</Label>
        <Input
          id="siteName"
          name="siteName"
          value={openGraph.siteName || ''}
          onChange={handleInputChange}
          placeholder="Your Website Name"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="locale">Locale (optional)</Label>
        <Input
          id="locale"
          name="locale"
          value={openGraph.locale || ''}
          onChange={handleInputChange}
          placeholder="en_US"
        />
      </div>
    </div>
  )
} 