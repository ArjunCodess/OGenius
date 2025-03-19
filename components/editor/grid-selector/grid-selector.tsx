'use client'

import { getGridPresets } from '@/lib/grid-utils'
import { generateGridPattern, getGridBackgroundSize } from '@/lib/grid-utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { GridSettings, GridType } from '@/types/image-types'
import { Slider } from '@/components/ui/slider'

interface GridSelectorProps {
  config: GridSettings
  onChange: (grid: GridSettings) => void
}

export function GridSelector({ config, onChange }: GridSelectorProps) {
  const presets = getGridPresets()

  const handleGridTypeChange = (value: GridType) => {
    const preset = presets.find(p => p.type === value) || presets[0]
    onChange({ 
      ...config, 
      ...preset,
      type: value
    })
  }

  const handleOpacityChange = (value: number[]) => {
    onChange({
      ...config,
      opacity: value[0]
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Grid Type</Label>
        <RadioGroup
          value={config.type}
          onValueChange={(value) => handleGridTypeChange(value as GridType)}
          className="grid grid-cols-4 gap-2 mt-4"
        >
          {presets.map((preset) => {
            // Manually create preview patterns for better visibility
            let previewStyle: React.CSSProperties = {
              backgroundImage: 'none',
              backgroundSize: 'auto',
              backgroundColor: '#ffffff'
            }

            if (preset.type === 'grid') {
              previewStyle = {
                backgroundImage: `
                  linear-gradient(to right, #000 1px, transparent 1px),
                  linear-gradient(to bottom, #000 1px, transparent 1px)
                `,
                backgroundSize: '10px 10px',
                opacity: 0.5
              }
            } else if (preset.type === 'lines') {
              previewStyle = {
                backgroundImage: `linear-gradient(to bottom, #000 1px, transparent 1px)`,
                backgroundSize: '1px 10px',
                opacity: 0.5
              }
            } else if (preset.type === 'dots') {
              previewStyle = {
                backgroundImage: `radial-gradient(circle 2px, #000 0%, #000 60%, transparent 60%)`,
                backgroundSize: '10px 10px',
                opacity: 0.7
              }
            }

            return (
              <div key={preset.type} className="space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={preset.type} id={`grid-${preset.type}`} />
                  <Label htmlFor={`grid-${preset.type}`} className="capitalize">
                    {preset.type}
                  </Label>
                </div>
                <div
                  className="h-20 w-full rounded-md border bg-white"
                  style={previewStyle}
                ></div>
              </div>
            )
          })}
        </RadioGroup>
      </div>

      {config.type !== 'none' && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="grid-opacity" className="text-sm font-medium">Grid Opacity</Label>
            <span className="text-sm text-muted-foreground">{config.opacity}%</span>
          </div>
          <Slider
            id="grid-opacity"
            min={0}
            max={100}
            step={1}
            value={[config.opacity]}
            onValueChange={handleOpacityChange}
          />
        </div>
      )}
    </div>
  )
}