import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import RatingStars from '../components/RatingStars'
import { useEvent, useBooking } from '../api/hooks'

export default function EventDetails() {
  const { id } = useParams<{ id: string }>()
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isAr = i18n.language === 'ar'

  const { data: event, isLoading, error } = useEvent(id)
  const booking = useBooking()

  const [galleryIndex, setGalleryIndex] = useState(0)

  const isLoggedIn = () => !!localStorage.getItem('eventory_token')

  const handleBook = () => {
    if (!event) return
    if (!isLoggedIn()) {
      navigate(`/login?returnTo=${encodeURIComponent(`/event/${event.id}`)}`)
      return
    }
    booking.mutate(event.id, {
      onSuccess: () => {
        alert(isAr ? 'تم الحجز بنجاح!' : 'Booking successful!')
      },
      onError: () => {
        alert(isAr ? 'حدث خطأ' : 'An error occurred')
      },
    })
  }

  if (isLoading) {
    return (
      <div className="content-container py-16">
        <div className="animate-pulse">
          <div className="aspect-video bg-gray-200 rounded-xl animate-shimmer mb-8" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4 animate-shimmer" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6 animate-shimmer" />
        </div>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="content-container py-16 text-center">
        <p className="text-gray-600">{isAr ? 'الفعالية غير موجودة' : 'Event not found'}</p>
        <Link to="/" className="text-primary-600 hover:underline mt-4 inline-block">
          {t('common.viewAll')}
        </Link>
      </div>
    )
  }

  const title = event.title[isAr ? 'ar' : 'en']
  const formatTime = (iso: string) =>
    new Date(iso).toLocaleString(isAr ? 'ar-SA' : 'en-US', {
      dateStyle: 'full',
      timeStyle: 'short',
    })

  return (
    <div className="content-container py-8">
      <div className="mb-8">
        <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-6">
          <img
            src={event.images[galleryIndex] ?? event.images[0]}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {event.images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2" role="tablist">
            {event.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setGalleryIndex(i)}
                className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-colors ${
                  i === galleryIndex ? 'border-primary-500' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
                aria-label={`${t('event.gallery')} ${i + 1}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <div className="flex flex-wrap items-center gap-4">
          <RatingStars rating={event.rating} />
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{event.venue}, {event.location}</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-600">{event.price} SAR</span>
        </div>
        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{formatTime(event.startTime)}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
            <span>{event.venue}, {event.location}</span>
          </div>
        </div>
        <p className="text-gray-600">{event.description[isAr ? 'ar' : 'en']}</p>
        <button
          onClick={handleBook}
          disabled={event.soldOut || booking.isPending}
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
        >
          {event.soldOut ? t('common.soldOut') : booking.isPending ? '...' : t('event.bookNow')}
        </button>
      </div>
    </div>
  )
}
