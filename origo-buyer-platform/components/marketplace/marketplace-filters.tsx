"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, X } from "lucide-react"

interface FilterState {
  search: string
  cropTypes: string[]
  grades: string[]
  districts: string[]
  endingSoon: boolean
  exportReady: boolean
  minPrice: string
  maxPrice: string
}

interface MarketplaceFiltersProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
  onClearFilters: () => void
}

const cropOptions = ["Rice", "Wheat", "Maize", "Sugarcane", "Cotton", "Turmeric", "Onion", "Potato"]
const gradeOptions = ["A", "B", "C"]
const districtOptions = ["Cuttack", "Bhubaneswar", "Puri", "Balasore", "Sambalpur", "Berhampur"]

export function MarketplaceFilters({ filters, onFiltersChange, onClearFilters }: MarketplaceFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "cropTypes" | "grades" | "districts", value: string) => {
    const currentArray = filters[key]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const hasActiveFilters =
    filters.search ||
    filters.cropTypes.length > 0 ||
    filters.grades.length > 0 ||
    filters.districts.length > 0 ||
    filters.endingSoon ||
    filters.exportReady ||
    filters.minPrice ||
    filters.maxPrice

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search crops, batch ID..."
              value={filters.search}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Crop Types */}
        <div className="space-y-3">
          <Label>Crop Types</Label>
          <div className="flex flex-wrap gap-2">
            {cropOptions.map((crop) => (
              <Badge
                key={crop}
                variant={filters.cropTypes.includes(crop) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => toggleArrayFilter("cropTypes", crop)}
              >
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Quality Grades */}
        <div className="space-y-3">
          <Label>Quality Grade</Label>
          <div className="flex gap-2">
            {gradeOptions.map((grade) => (
              <Badge
                key={grade}
                variant={filters.grades.includes(grade) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => toggleArrayFilter("grades", grade)}
              >
                Grade {grade}
              </Badge>
            ))}
          </div>
        </div>

        {/* Districts */}
        <div className="space-y-3">
          <Label>Districts</Label>
          <div className="flex flex-wrap gap-2">
            {districtOptions.map((district) => (
              <Badge
                key={district}
                variant={filters.districts.includes(district) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10"
                onClick={() => toggleArrayFilter("districts", district)}
              >
                {district}
              </Badge>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <Label>Price Range (₹)</Label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => updateFilter("minPrice", e.target.value)}
              type="number"
            />
            <Input
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => updateFilter("maxPrice", e.target.value)}
              type="number"
            />
          </div>
        </div>

        {/* Quick Filters */}
        <div className="space-y-3">
          <Label>Quick Filters</Label>
          <div className="space-y-2">
            <Badge
              variant={filters.endingSoon ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 w-full justify-center py-2"
              onClick={() => updateFilter("endingSoon", !filters.endingSoon)}
            >
              Ending Soon (&lt; 24h)
            </Badge>
            <Badge
              variant={filters.exportReady ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 w-full justify-center py-2"
              onClick={() => updateFilter("exportReady", !filters.exportReady)}
            >
              Export Ready (Certified)
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
