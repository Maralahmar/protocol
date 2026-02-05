import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import EventCard from './EventCard'
import EventCardSkeleton from './EventCardSkeleton'
import type { Event } from '../api/hooks'

interface SectionBlockProps {
  titleKey: string
  slug: string
  events: Event[]
  isLoading?: boolean
}

export default function SectionBlock({ titleKey, slug, events, isLoading }: SectionBlockProps) {
  const { t } = useTranslation()
  const title = t(`categories.${titleKey}`)

  return (
    <section className="py-12 lg:py-16" aria-labelledby={`section-${slug}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 id={`section-${slug}`} className="text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <Link
            to={`/category/${slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors shrink-0"
          >
            {t('common.viewAll')} →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
            : events.slice(0, 6).map((event) => <EventCard key={event.id} event={event} />)}
        </div>
      </div>
    </section>
  )
}
