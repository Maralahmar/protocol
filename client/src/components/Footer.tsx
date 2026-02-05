import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CATEGORIES } from '../i18n'

const APP_STORE_URL = '#'
const GOOGLE_PLAY_URL = '#'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="mt-auto" role="contentinfo">
      {/* Download the app — نفس تصميم الصورة: خلفية زرقاء، عنوان، أزرار */}
      <section
        className="bg-primary-500 py-14 lg:py-16"
        aria-labelledby="footer-download-heading"
      >
        <div className="content-container w-full">
          <div className="flex flex-col items-center text-center">
            <h2
              id="footer-download-heading"
              className="text-2xl sm:text-3xl font-bold text-white mb-2"
            >
              {t('app.download')}
            </h2>
            <p className="text-white/95 text-sm mb-6">{t('app.availableOn')}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={APP_STORE_URL}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white font-medium transition-colors"
                aria-label="Download on App Store"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
                App Store
              </a>
              <a
                href={GOOGLE_PLAY_URL}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white font-medium transition-colors"
                aria-label="Get it on Google Play"
              >
                <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" aria-hidden>
                  <path fill="currentColor" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,12L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer — خلفية داكنة، براند، فئات، حقوق */}
      <section className="bg-gray-950 text-gray-400">
        <div className="content-container w-full py-10 lg:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Brand + version */}
            <div className="lg:col-span-4 flex flex-col">
              <span className="text-white font-semibold text-lg">{t('brand')}</span>
              <span className="mt-2 w-12 h-px bg-gray-600" aria-hidden />
            </div>

            {/* Categories — عرض أنيق: حبوب تفاعلية */}
            <div className="sm:col-span-2 lg:col-span-8">
              <h3 className="text-white font-semibold mb-5">{t('footer.categories')}</h3>
              <div className="grid grid-cols-5 gap-2 sm:gap-3 w-fit">
                {CATEGORIES.map(({ slug, arKey }) => (
                  <Link
                    key={slug}
                    to={`/category/${slug}`}
                    className="inline-flex items-center px-4 py-2.5 rounded-full text-sm font-medium
                      bg-gray-800/80 text-gray-300 border border-gray-700/80
                      hover:bg-primary-500/20 hover:text-white hover:border-primary-500/60
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950
                      transition-all duration-200"
                  >
                    {t(`categories.${arKey}`)}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 pt-6 border-t border-gray-800 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} {t('brand')}. {t('footer.copyright')}.
          </div>
        </div>
      </section>
    </footer>
  )
}
