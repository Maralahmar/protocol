import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORIES } from '../i18n'

interface HeaderProps {
  onMenuClick?: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { t, i18n } = useTranslation()
  const [categoriesOpen, setCategoriesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 safe-area-top">
      {/* شريط علوي زخرفي بلون العلامة */}
      <div className="h-1 bg-primary-600" aria-hidden />
      <div className="bg-white/98 backdrop-blur-md border-b border-gray-200/80 shadow-sm">
        <div className="content-container max-w-[100vw]">
          <div className="flex items-center justify-between h-16 sm:h-[4.25rem] gap-3 sm:gap-6 min-w-0">
            {/* الشعار + زر القائمة */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0 min-w-0">
              <button
                type="button"
                onClick={onMenuClick}
                className="p-2.5 -m-1 rounded-xl text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 transition-colors touch-manipulation"
                aria-label={i18n.language === 'ar' ? 'فتح القائمة' : 'Open menu'}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link
                to="/"
                className="text-xl sm:text-2xl font-bold text-primary-600 hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 rounded-lg transition-colors truncate min-w-0"
                aria-label={t('brand')}
              >
                {t('brand')}
              </Link>
            </div>

            {/* التنقل: جميع الأحداث القادمة + الفئات (الفعاليات فرعية داخل الفئات) */}
            <nav className="hidden md:flex items-center gap-0.5" aria-label={t('nav.categories')}>
              <Link
                to="/category/all"
                className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 transition-colors"
              >
                {t('nav.allUpcomingEvents')}
              </Link>
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setCategoriesOpen((v) => !v)}
                  onMouseEnter={() => setCategoriesOpen(true)}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 transition-colors"
                  aria-expanded={categoriesOpen}
                  aria-haspopup="true"
                  id="categories-menu-button"
                >
                  {t('nav.categories')}
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${categoriesOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`absolute top-full left-0 rtl:left-auto rtl:right-0 mt-1.5 min-w-[220px] py-2 bg-white rounded-xl border border-gray-200 shadow-xl transition-all duration-200 ease-out ${
                    categoriesOpen
                      ? 'opacity-100 scale-100 translate-y-0 visible'
                      : 'opacity-0 scale-95 translate-y-1 pointer-events-none invisible'
                  }`}
                  onMouseLeave={() => setCategoriesOpen(false)}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="categories-menu-button"
                >
                  {CATEGORIES.map(({ slug, arKey }) => (
                    <Link
                      key={slug}
                      to={`/category/${slug}`}
                      role="menuitem"
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 focus:bg-primary-50 focus:text-primary-700 focus:outline-none transition-colors first:rounded-t-[10px] last:rounded-b-[10px]"
                      onClick={() => setCategoriesOpen(false)}
                    >
                      {t(`categories.${arKey}`)}
                    </Link>
                  ))}
                </div>
              </div>
            </nav>

            {/* مبدل اللغة + تسجيل الدخول */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                type="button"
                onClick={toggleLang}
                className="min-w-[2.5rem] px-3 py-2.5 text-sm font-semibold text-gray-600 hover:text-primary-600 hover:border-primary-300 rounded-xl border border-gray-200 bg-white hover:bg-primary-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 transition-colors touch-manipulation"
                aria-label={i18n.language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
              >
                {i18n.language === 'ar' ? 'EN' : 'ع'}
              </button>
              <Link
                to="/login"
                className="px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 rounded-xl shadow-md shadow-primary-600/25 hover:shadow-lg hover:shadow-primary-600/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 transition-all touch-manipulation whitespace-nowrap"
              >
                {t('nav.login')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
