import { Router, Request } from 'express'
import { events } from '../data/seed.js'

const router = Router()

router.get('/', (req: Request<{}, {}, {}, {
  category?: string
  search?: string
  location?: string
  minPrice?: string
  maxPrice?: string
  date?: string
  sort?: string
}>, res) => {
  let result = [...events]
  const { category, search, location, minPrice, maxPrice, sort } = req.query

  if (category) {
    result = result.filter((e) => e.category === category)
  }
  if (search) {
    const raw = String(search).trim().toLowerCase()
    if (raw) {
      const words = raw.split(/\s+/).filter(Boolean)
      result = result.filter((e) => {
        const titleAr = e.title.ar.toLowerCase()
        const titleEn = e.title.en.toLowerCase()
        const descAr = e.description.ar.toLowerCase()
        const descEn = e.description.en.toLowerCase()
        const venue = e.venue.toLowerCase()
        const loc = e.location.toLowerCase()
        const searchable = [titleAr, titleEn, descAr, descEn, venue, loc].join(' ')
        return words.every((word) => searchable.includes(word))
      })
    }
  }
  if (location) {
    result = result.filter((e) => e.location.toLowerCase() === location.toLowerCase())
  }
  if (minPrice) {
    const min = Number(minPrice)
    if (!isNaN(min)) result = result.filter((e) => e.price >= min)
  }
  if (maxPrice) {
    const max = Number(maxPrice)
    if (!isNaN(max)) result = result.filter((e) => e.price <= max)
  }
  if (sort === 'rating') {
    result.sort((a, b) => b.rating - a.rating)
  } else if (sort === 'newest') {
    result.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  }

  res.json(result)
})

router.get('/:id', (req, res) => {
  const event = events.find((e) => e.id === req.params.id)
  if (!event) return res.status(404).json({ error: 'Event not found' })
  res.json(event)
})

export default router
