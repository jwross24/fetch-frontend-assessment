export interface Dog {
  id: string
  img: string
  name: string
  age: number
  zip_code: string
  breed: string
}

export interface Location {
  zip_code: string
  latitude: number
  longitude: number
  city: string
  state: string
  county: string
}

export interface Match {
  match: string
}

export interface SearchResults {
  resultIds: string[]
  total: number
  prev?: string
  next?: string
}
