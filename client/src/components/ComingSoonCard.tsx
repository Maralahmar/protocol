import { useTranslation } from 'react-i18next'

export default function ComingSoonCard() {
  const { t } = useTranslation()

  return (
    <div
      className="block w-full min-w-0 bg-white rounded-xl overflow-hidden shadow-card border border-gray-100"
      aria-hidden
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-400 line-clamp-2 mb-2">
          {t('common.comingSoon')}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="text-gray-200" aria-hidden>
                ★
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-3">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="h-4 w-24 bg-gray-200 rounded" />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="h-4 flex-1 max-w-[8rem] bg-gray-200 rounded" />
        </div>
        <div className="flex items-center justify-between">
          <span className="h-5 w-16 bg-gray-200 rounded" />
          <span className="text-sm text-gray-300">—</span>
        </div>
      </div>
    </div>
  )
}
