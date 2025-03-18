'use client'

import { useEditor } from '@/context/editor-context'
import { getGridPresets } from '@/lib/grid-utils'
import { generateGridPattern, getGridBackgroundSize } from '@/lib/grid-utils'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { GridType } from '@/types/image-types'

export function GridSelector() {
  const { config, updateGrid } = useEditor()
  const presets = getGridPresets()

  const handleGridTypeChange = (value: GridType) => {
    const preset = presets.find(p => p.type === value) || presets[0]
    updateGrid({ 
      ...config.grid, 
      ...preset,
      type: value
    })
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium">Grid Type</Label>
        <RadioGroup
          defaultValue={config.grid.type}
          onValueChange={(value) => handleGridTypeChange(value as GridType)}
          className="grid grid-cols-4 gap-2 mt-4"
        >
          {presets.map((preset) => {
            // Create a preview div with the grid pattern
            const previewStyle = {
              backgroundImage: generateGridPattern(preset),
              backgroundSize: getGridBackgroundSize(preset),
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
    </div>
  )
}