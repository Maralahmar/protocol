import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORIES } from '../i18n'

const iconClass = 'w-5 h-5 shrink-0'

function HomeIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  )
}

function CategoryIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  )
}

function EventsIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function HelpIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function DocIcon() {
  return (
    <svg className={iconClass} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const isRtl = i18n.language === 'ar'

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const linkClass = (path: string) =>
    `flex items-center gap-3 px-4 py-3 lg:py-3.5 lg:gap-4 rounded-xl text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
      isActive(path) ? 'bg-primary-600/25 text-primary-400 font-semibold' : ''
    }`

  const subLinkClass = (path: string) =>
    `flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 ${
      isActive(path) ? 'bg-primary-600/20 text-primary-400 font-medium' : ''
    }`

  return (
    <aside
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`
        fixed top-0 bottom-0 z-40 w-64 max-w-[85vw] sm:w-72 bg-gray-900
        flex flex-col
        transition-transform duration-300 ease-out
        start-0
        border-e border-gray-800
        shadow-[2px_0_24px_-4px_rgba(0,0,0,0.4)]
        [dir="rtl"]:shadow-[-2px_0_24px_-4px_rgba(0,0,0,0.4)]
        ${isOpen ? 'translate-x-0' : isRtl ? 'translate-x-full' : '-translate-x-full'}
      `}
      aria-label={t('sidebar.label')}
      aria-hidden={!isOpen}
    >
      <div className="flex items-center h-16 lg:h-[4.5rem] px-4 lg:px-5 border-b border-gray-800 shrink-0 pt-[env(safe-area-inset-top,0)]">
        <Link
          to="/"
          className="text-xl lg:text-2xl font-bold text-primary-500 hover:text-primary-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 rounded"
          onClick={onClose}
        >
          {t('brand')}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 lg:py-6 sidebar-nav">
        <p className="px-4 lg:px-5 mb-2 lg:mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {t('sidebar.menu')}
        </p>
        <ul className="space-y-0.5 lg:space-y-1 px-2 lg:px-3" role="list">
          <li>
            <Link to="/" className={linkClass('/')} onClick={onClose}>
              <HomeIcon />
              <span>{t('sidebar.home')}</span>
            </Link>
          </li>
          <li>
            <Link
              to="/category/all"
              className={linkClass('/category/all')}
              onClick={onClose}
            >
              <EventsIcon />
              <span>{t('sidebar.allUpcomingEvents')}</span>
            </Link>
          </li>
          <li>
            <span className="flex items-center gap-3 lg:gap-4 px-4 py-2.5 lg:py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <CategoryIcon />
              {t('sidebar.categories')}
            </span>
            <ul className="mt-0.5 ms-4 lg:ms-5 space-y-0.5 border-s border-gray-700 ps-3 lg:ps-4" role="list" aria-label={t('sidebar.categories')}>
              {CATEGORIES.map(({ slug, arKey }) => (
                <li key={slug}>
                  <Link
                    to={`/category/${slug}`}
                    className={subLinkClass(`/category/${slug}`)}
                    onClick={onClose}
                  >
                    {t(`categories.${arKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>

        <p className="px-4 lg:px-5 mt-8 lg:mt-10 mb-2 lg:mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
          {t('sidebar.settings')}
        </p>
        <ul className="space-y-0.5 lg:space-y-1 px-2 lg:px-3" role="list">
          <li>
            <a
              href="#faq"
              className="flex items-center gap-3 lg:gap-4 px-4 py-3 lg:py-3.5 rounded-xl text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              onClick={onClose}
            >
              <HelpIcon />
              <span>{t('sidebar.faq')}</span>
            </a>
          </li>
          <li>
            <a
              href="#help"
              className="flex items-center gap-3 lg:gap-4 px-4 py-3 lg:py-3.5 rounded-xl text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              onClick={onClose}
            >
              <HelpIcon />
              <span>{t('sidebar.helpCenter')}</span>
            </a>
          </li>
          <li>
            <a
              href="#terms"
              className="flex items-center gap-3 lg:gap-4 px-4 py-3 lg:py-3.5 rounded-xl text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              onClick={onClose}
            >
              <DocIcon />
              <span>{t('sidebar.terms')}</span>
            </a>
          </li>
          <li>
            <a
              href="#privacy"
              className="flex items-center gap-3 lg:gap-4 px-4 py-3 lg:py-3.5 rounded-xl text-gray-300 hover:bg-gray-700/60 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
              onClick={onClose}
            >
              <DocIcon />
              <span>{t('sidebar.privacy')}</span>
            </a>
          </li>
        </ul>
      </nav>

      <div className="px-4 lg:px-5 py-3 lg:py-4 border-t border-gray-800 shrink-0">
        <p className="text-xs text-gray-500">{t('brand')} v1.0</p>
      </div>
    </aside>
  )
}
