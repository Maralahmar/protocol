import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import RatingStars from './RatingStars'
import type { Event } from '../api/hooks'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const { t, i18n } = useTranslation()
  const isAr = i18n.language === 'ar'
  const title = event.title[isAr ? 'ar' : 'en']

  const formatTime = (iso: string) => {
    const d = new Date(iso)
    return d.toLocaleDateString(isAr ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <Link
      to={`/event/${event.id}`}
      className={`group block w-full min-w-0 bg-white rounded-xl transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
        event.soldOut
          ? 'shadow-executed'
          : 'shadow-card hover:shadow-card-hover hover:-translate-y-1'
      }`}
      aria-label={`${title}, ${event.rating} ${t('event.rating')}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={event.images[0]}
          alt=""
          draggable={false}
          className={`w-full h-full object-cover transition-all duration-300 ${event.soldOut ? 'grayscale' : 'group-hover:scale-105'}`}
        />
        {event.soldOut && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-t-xl"
            aria-hidden
          >
            <span className="text-2xl font-bold text-white drop-shadow-md">
              {t('common.soldOut')}
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <RatingStars rating={event.rating} size="sm" />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{formatTime(event.startTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="line-clamp-1">{event.venue}, {event.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-primary-600">{event.price} SAR</span>
          {!event.soldOut && (
            <span className="text-sm font-medium text-primary-600 group-hover:text-primary-700">
              {t('common.book')} →
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
