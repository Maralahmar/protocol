import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import HorizontalScroller from './HorizontalScroller'
import EventCard from './EventCard'
import EventCardSkeleton from './EventCardSkeleton'
import ComingSoonCard from './ComingSoonCard'
import type { Event } from '../api/hooks'

const CARD_WIDTH_CLASS = 'card-width-fluid snap-start'
const MIN_VISIBLE_CARDS = 4

interface CategoryRowProps {
  titleKey: string
  slug: string
  items: Event[]
  isLoading?: boolean
}

export default function CategoryRow({ titleKey, slug, items, isLoading }: CategoryRowProps) {
  const { t, i18n } = useTranslation()
  const title = t(`categories.${titleKey}`)
  const isAr = i18n.language === 'ar'

  return (
    <section className="py-8 lg:py-10" aria-labelledby={`section-${slug}`}>
      <div className="mb-4">
        <div className="flex flex-row items-center justify-between gap-4">
          <h2 id={`section-${slug}`} className="text-xl sm:text-2xl font-bold text-gray-900">
            {title}
          </h2>
          <Link
            to={`/category/${slug}`}
            className="text-primary-600 hover:text-primary-700 font-medium transition-colors shrink-0 text-sm sm:text-base"
          >
            {t('common.viewAll')} {isAr ? '←' : '→'}
          </Link>
        </div>
      </div>
      <HorizontalScroller>
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={CARD_WIDTH_CLASS}>
                <EventCardSkeleton />
              </div>
            ))
          : (() => {
              const visible = items.slice(0, 10)
              const needPlaceholders = visible.length < MIN_VISIBLE_CARDS
              const placeholdersCount = needPlaceholders
                ? Math.min(MIN_VISIBLE_CARDS - visible.length, 10 - visible.length)
                : 0
              return (
                <>
                  {visible.map((event) => (
                    <div key={event.id} className={CARD_WIDTH_CLASS} role="listitem">
                      <EventCard event={event} />
                    </div>
                  ))}
                  {Array.from({ length: placeholdersCount }).map((_, i) => (
                    <div key={`coming-soon-${i}`} className={CARD_WIDTH_CLASS} aria-hidden>
                      <ComingSoonCard />
                    </div>
                  ))}
                </>
              )
            })()}
      </HorizontalScroller>
    </section>
  )
}
