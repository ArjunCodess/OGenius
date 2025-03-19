import React from 'react'
import { TwitterMetadata } from '@/types/metadata-types'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface TwitterFormProps {
  twitter: TwitterMetadata
  onChange: (twitter: TwitterMetadata) => void
}

export default function TwitterForm({ twitter, onChange }: TwitterFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onChange({
      ...twitter,
      [name]: value,
    })
  }

  const handleCardChange = (value: 'summary' | 'summary_large_image' | 'app' | 'player') => {
    onChange({
      ...twitter,
      card: value,
    })
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="grid gap-2">
        <Label htmlFor="card">Card Type</Label>
        <Select
          value={twitter.card}
          onValueChange={(value) => handleCardChange(value as any)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a card type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="summary">Summary</SelectItem>
            <SelectItem value="summary_large_image">Summary with Large Image</SelectItem>
            <SelectItem value="app">App</SelectItem>
            <SelectItem value="player">Player</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title (optional, uses OG if not set)</Label>
        <Input
          id="title"
          name="title"
          value={twitter.title || ''}
          onChange={handleInputChange}
          placeholder="Tweet title"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description (optional, uses OG if not set)</Label>
        <Textarea
          id="description"
          name="description"
          value={twitter.description || ''}
          onChange={handleInputChange}
          placeholder="Brief description for Twitter"
          rows={3}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="image">Image URL (optional, uses OG if not set)</Label>
        <Input
          id="image"
          name="image"
          value={twitter.image || ''}
          onChange={handleInputChange}
          placeholder="https://example.com/twitter-image.jpg"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="site">Twitter Site (optional)</Label>
        <Input
          id="site"
          name="site"
          value={twitter.site || ''}
          onChange={handleInputChange}
          placeholder="@YourSite"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="creator">Twitter Creator (optional)</Label>
        <Input
          id="creator"
          name="creator"
          value={twitter.creator || ''}
          onChange={handleInputChange}
          placeholder="@YourUsername"
        />
      </div>
    </div>
  )
} 