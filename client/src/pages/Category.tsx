import { useCallback } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EventCard from '../components/EventCard'
import EventCardSkeleton from '../components/EventCardSkeleton'
import FiltersBar from '../components/FiltersBar'
import { useEvents } from '../api/hooks'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { CATEGORIES } from '../i18n'

const SEARCH_DEBOUNCE_MS = 400

export default function Category() {
  const { slug } = useParams<{ slug: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation()

  const search = searchParams.get('search') ?? ''
  const debouncedSearch = useDebouncedValue(search, SEARCH_DEBOUNCE_MS)
  const location = searchParams.get('location') ?? ''
  const sort = (searchParams.get('sort') as 'rating' | 'newest') || 'rating'

  const isAllUpcoming = slug === 'all'
  const category = CATEGORIES.find((c) => c.slug === slug)
  const titleKey = isAllUpcoming ? 'allUpcomingEvents' : (category?.arKey ?? slug)

  const { data: events = [], isLoading } = useEvents({
    ...(isAllUpcoming ? {} : { category: slug }),
    search: debouncedSearch.trim() || undefined,
    location: location || undefined,
    sort,
  })

  const updateParam = useCallback((key: string, value: string) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev)
      if (value) next.set(key, value)
      else next.delete(key)
      return next
    })
  }, [setSearchParams])

  const resetFilters = useCallback(() => {
    setSearchParams({})
  }, [setSearchParams])

  return (
    <>
      <div className="content-container py-6 sm:py-8 max-w-[100vw] overflow-x-hidden">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          {t(`categories.${titleKey}`)}
        </h1>
        <FiltersBar
          search={search}
          onSearchChange={(v) => updateParam('search', v)}
          location={location}
          onLocationChange={(v) => updateParam('location', v)}
          sort={sort}
          onSortChange={(v) => updateParam('sort', v)}
          onReset={resetFilters}
        />
        <p className="mt-4 text-gray-600">
          {events.length} {t('category.results')}
        </p>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          {isLoading
            ? Array.from({ length: 9 }).map((_, i) => <EventCardSkeleton key={i} />)
            : events.map((event) => <EventCard key={event.id} event={event} />)}
        </div>
        {!isLoading && events.length === 0 && (
          <p className="text-center text-gray-500 py-16">{t('common.viewAll')}</p>
        )}
      </div>
    </>
  )
}
