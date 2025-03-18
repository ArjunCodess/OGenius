"use client";

import { useEditor } from "@/context/editor-context";
import { getGradientPresets } from "@/lib/gradient-utils";
import { generateGradientBackground } from "@/lib/gradient-utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function GradientPresets() {
  const { config, updateBackground } = useEditor();
  const presets = getGradientPresets();

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium">Gradient Presets</Label>
      <div className="grid grid-cols-5 gap-2 mt-4">
        {presets.map((preset, index) => {
          const isActive =
            config.background.type === preset.type &&
            JSON.stringify(config.background.colors) ===
              JSON.stringify(preset.colors);

          return (
            <Button
              key={index}
              className={`h-16 rounded-md border transition-all mb-2 hover:shadow-md ${
                isActive
                  ? "ring-2 ring-primary ring-offset-2"
                  : "hover:scale-105"
              }`}
              style={{ background: generateGradientBackground(preset) }}
              onClick={() => updateBackground(preset)}
              aria-label={`Gradient preset ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
