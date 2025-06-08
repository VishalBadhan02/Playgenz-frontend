import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { ArrowLeft, RotateCcw, Download } from "lucide-react";

interface Filters {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sepia: number;
}

interface ImageFiltersProps {
  imageSrc: string;
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onBack: () => void;
  onSave: () => void;
}

export const ImageFilters = ({ 
  imageSrc, 
  filters, 
  onFiltersChange, 
  onBack, 
  onSave 
}: ImageFiltersProps) => {
  const [presets] = useState([
    {
      name: "Normal",
      filters: { brightness: 100, contrast: 100, saturation: 100, blur: 0, sepia: 0 }
    },
    {
      name: "Clarendon",
      filters: { brightness: 110, contrast: 130, saturation: 120, blur: 0, sepia: 10 }
    },
    {
      name: "Gingham",
      filters: { brightness: 105, contrast: 95, saturation: 85, blur: 0, sepia: 15 }
    },
    {
      name: "Moon",
      filters: { brightness: 100, contrast: 120, saturation: 0, blur: 0, sepia: 0 }
    },
    {
      name: "Lark",
      filters: { brightness: 115, contrast: 110, saturation: 90, blur: 0, sepia: 5 }
    },
    {
      name: "Reyes",
      filters: { brightness: 110, contrast: 85, saturation: 75, blur: 0, sepia: 30 }
    },
    {
      name: "Juno",
      filters: { brightness: 120, contrast: 110, saturation: 140, blur: 0, sepia: 0 }
    },
    {
      name: "Slumber",
      filters: { brightness: 95, contrast: 85, saturation: 120, blur: 1, sepia: 20 }
    }
  ]);

  const handleFilterChange = useCallback((filterName: keyof Filters, value: number[]) => {
    onFiltersChange({
      ...filters,
      [filterName]: value[0]
    });
  }, [filters, onFiltersChange]);

  const applyPreset = useCallback((preset: typeof presets[0]) => {
    onFiltersChange(preset.filters);
  }, [onFiltersChange]);

  const resetFilters = useCallback(() => {
    onFiltersChange({
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sepia: 0,
    });
  }, [onFiltersChange]);

  const filterStyle = {
    filter: `
      brightness(${filters.brightness}%) 
      contrast(${filters.contrast}%) 
      saturate(${filters.saturation}%) 
      blur(${filters.blur}px) 
      sepia(${filters.sepia}%)
    `
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Crop
        </Button>
        
        <Button variant="outline" onClick={resetFilters}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="space-y-6">
        {/* Preview */}
        <div className="flex justify-center">
          <div className="relative max-w-md">
            <img
              src={imageSrc}
              alt="Filtered preview"
              style={filterStyle}
              className="w-full h-auto rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Filter Presets */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-center">Filters</h3>
          <div className="grid grid-cols-4 gap-3">
            {presets.map((preset) => (
              <div key={preset.name} className="text-center">
                <div 
                  className="relative cursor-pointer group"
                  onClick={() => applyPreset(preset)}
                >
                  <img
                    src={imageSrc}
                    alt={preset.name}
                    style={{
                      filter: `
                        brightness(${preset.filters.brightness}%) 
                        contrast(${preset.filters.contrast}%) 
                        saturate(${preset.filters.saturation}%) 
                        blur(${preset.filters.blur}px) 
                        sepia(${preset.filters.sepia}%)
                      `
                    }}
                    className="w-full aspect-square object-cover rounded-lg border-2 border-transparent group-hover:border-primary transition-all duration-200"
                  />
                </div>
                <p className="text-xs mt-1 font-medium">{preset.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manual Adjustments */}
        <Card>
          <CardHeader>
            <CardTitle>Fine-tune</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brightness" className="text-xs">
                  Brightness
                </Label>
                <Slider
                  id="brightness"
                  min={50}
                  max={150}
                  step={1}
                  value={[filters.brightness]}
                  onValueChange={(value) => handleFilterChange('brightness', value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contrast" className="text-xs">
                  Contrast
                </Label>
                <Slider
                  id="contrast"
                  min={50}
                  max={150}
                  step={1}
                  value={[filters.contrast]}
                  onValueChange={(value) => handleFilterChange('contrast', value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="saturation" className="text-xs">
                  Saturation
                </Label>
                <Slider
                  id="saturation"
                  min={0}
                  max={200}
                  step={1}
                  value={[filters.saturation]}
                  onValueChange={(value) => handleFilterChange('saturation', value)}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="warmth" className="text-xs">
                  Warmth
                </Label>
                <Slider
                  id="warmth"
                  min={0}
                  max={100}
                  step={1}
                  value={[filters.sepia]}
                  onValueChange={(value) => handleFilterChange('sepia', value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={onSave} className="min-w-[120px]">
          Save Photo
        </Button>
      </div>
    </div>
  );
};