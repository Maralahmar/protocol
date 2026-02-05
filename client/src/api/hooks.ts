import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './client'

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
      const { data } = await api.get<Category[]>('/categories')
      return data
    },
  })
}

export function useEvents(params: EventsParams = {}) {
  return useQuery({
    queryKey: ['events', params],
    queryFn: async () => {
      const { data } = await api.get<Event[]>('/events', { params })
      return data
    },
  })
}

export function useEvent(id: string | undefined) {
  return useQuery({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data } = await api.get<Event>(`/events/${id}`)
      return data
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
