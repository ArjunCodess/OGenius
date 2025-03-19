"use client";

import { Button } from '@/components/ui/button'
import { gradientPresets } from '@/lib/gradient-utils'

interface GradientPresetsProps {
  onSelect: (colors: string[]) => void
}

export function GradientPresets({ onSelect }: GradientPresetsProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Background Presets</h3>
      <div className="grid grid-cols-4 gap-2">
        {gradientPresets.map((colors, index) => {
          const gradient = `linear-gradient(to right, ${colors.join(', ')})`
          
          return (
            <Button
              key={index}
              variant="outline"
              className="h-20 p-0 overflow-hidden"
              onClick={() => onSelect(colors)}
            >
              <div
                className="w-full h-full"
                style={{ background: gradient }}
              />
            </Button>
          )
        })}
      </div>
    </div>
  )
}
