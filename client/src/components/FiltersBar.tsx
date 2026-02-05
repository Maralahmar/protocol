import { useTranslation } from 'react-i18next'

/** Location values sent to API (must match server). Display names come from i18n locations.* */
const LOCATIONS = ['RUH BLVD CITY', 'BLVD WORLD', 'The Groves', 'KINGDOM ARENA', 'VIA RIYADH'] as const
const LOCATION_KEYS: Record<string, string> = {
  'RUH BLVD CITY': 'ruhBlvdCity',
  'BLVD WORLD': 'blvdWorld',
  'The Groves': 'theGroves',
  'KINGDOM ARENA': 'kingdomArena',
  'VIA RIYADH': 'viaRiyadh',
}

interface FiltersBarProps {
  search: string
  onSearchChange: (v: string) => void
  location: string
  onLocationChange: (v: string) => void
  sort: string
  onSortChange: (v: string) => void
  onReset: () => void
}

export default function FiltersBar({
  search,
  onSearchChange,
  location,
  onLocationChange,
  sort,
  onSortChange,
  onReset,
}: FiltersBarProps) {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.language === 'ar'

  return (
    <div
      className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100"
      dir={isRtl ? 'rtl' : 'ltr'}
      role="search"
      aria-label={t('common.search')}
    >
      <div className="flex-1 min-w-0">
        <label htmlFor="filter-search" className="sr-only">
          {t('common.search')}
        </label>
        <input
          id="filter-search"
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={t('nav.search')}
          autoComplete="off"
          aria-label={t('common.search')}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
        <div className="relative min-w-[10rem] sm:min-w-[11rem]">
          <label htmlFor="filter-location" className="sr-only">
            {t('common.location')}
          </label>
          <select
            id="filter-location"
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            aria-label={t('common.location')}
            className={`w-full appearance-none bg-white py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer text-gray-700 hover:border-gray-400 transition-colors ${isRtl ? 'pr-4 pl-9' : 'pl-4 pr-9'}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: isRtl ? 'left 0.5rem center' : 'right 0.5rem center',
              backgroundSize: '1.25rem',
            }}
          >
            <option value="">{t('common.allLocations')}</option>
            {LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {t(`locations.${LOCATION_KEYS[loc]}`)}
              </option>
            ))}
          </select>
        </div>
        <div className="relative min-w-[10rem] sm:min-w-[11rem]">
          <label htmlFor="filter-sort" className="sr-only">
            {t('common.sortBy')}
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            aria-label={t('common.sortBy')}
            className={`w-full appearance-none bg-white py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 cursor-pointer text-gray-700 hover:border-gray-400 transition-colors ${isRtl ? 'pr-4 pl-9' : 'pl-4 pr-9'}`}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: isRtl ? 'left 0.5rem center' : 'right 0.5rem center',
              backgroundSize: '1.25rem',
            }}
          >
            <option value="rating">{t('common.topRated')}</option>
            <option value="newest">{t('common.newest')}</option>
          </select>
        </div>
        <button
          type="button"
          onClick={onReset}
          aria-label={t('nav.resetFilter')}
          className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
        >
          {t('nav.resetFilter')}
        </button>
      </div>
    </div>
  )
}
