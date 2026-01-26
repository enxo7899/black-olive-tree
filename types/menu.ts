export type MenuCategory = 'starters' | 'mains' | 'desserts' | 'drinks' | 'cocktails'

export type DietTag = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free' | 'pescatarian'

export type Availability = 'day' | 'night' | 'all-day'

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: MenuCategory
  dietTags: DietTag[]
  allergens?: string[]
  spiceLevel?: 0 | 1 | 2 | 3
  image?: string
  availability: Availability
  featured?: boolean
  metaTags: string[]
}

export interface MenuData {
  version: string
  lastUpdated: string
  items: MenuItem[]
}
