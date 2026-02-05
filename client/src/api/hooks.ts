import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'
import { FALLBACK_CATEGORIES, FALLBACK_EVENTS } from '../data/fallback'

export interface Event {
  id: string
  title: { ar: string; en: string }
  description: { ar: string; en: string }
  category: string
  location: string
  venue: string
  startTime: string
  endTime: string
  price: number
  rating: number
  soldOut: boolean
  images: string[]
}

export interface Category {
  slug: string
  name: { ar: string; en: string }
  eventCount: number
}

export interface EventsParams {
  category?: string
  search?: string
  location?: string
  minPrice?: number
  maxPrice?: number
  date?: string
  sort?: 'rating' | 'newest'
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      try {
        const { data } = await api.get<Category[]>('/categories')
        if (Array.isArray(data) && data.length > 0) return data
      } catch {
        // API unavailable (e.g. static deploy)
      }
      return FALLBACK_CATEGORIES
    },
  })
}

function filterFallbackEvents(events: Event[], params: EventsParams): Event[] {
  let list = [...events]
  if (params.category) {
    list = list.filter((e) => e.category === params.category)
  }
  if (params.search?.trim()) {
    const q = params.search.trim().toLowerCase()
    list = list.filter(
      (e) =>
        e.title.ar.toLowerCase().includes(q) ||
        e.title.en.toLowerCase().includes(q)
    )
  }
  if (params.location) {
    list = list.filter((e) => e.location === params.location)
  }
  if (params.sort === 'newest') {
    list.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime())
  } else {
    list.sort((a, b) => b.rating - a.rating)
  }
  return list
}

export function useEvents(params: EventsParams = {}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: async () => {
      try {
        const { data } = await api.get<Event[]>('/events', { params })
        if (Array.isArray(data) && data.length > 0) return data
      } catch {
        // API unavailable (e.g. static deploy)
      }
      return filterFallbackEvents(FALLBACK_EVENTS, params)
    },
  })
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      try {
        const { data } = await api.get<Event>(`/events/${id}`)
        if (data && typeof data === 'object' && data.id) return data
      } catch {
        // API unavailable
      }
      const fallback = FALLBACK_EVENTS.find((e) => e.id === id)
      if (fallback) return fallback
      throw new Error('Event not found')
    },
    enabled: !!id,
  })
}

export function useLogin() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post<{ token: string }>('/auth/login', credentials)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('eventory_token', data.token)
      queryClient.invalidateQueries({ queryKey: ['auth'] })
    },
  })
}

export function useBooking() {
  return useMutation({
    mutationFn: async (eventId: string) => {
      const { data } = await api.post('/bookings', { eventId })
      return data
    },
  })
}
